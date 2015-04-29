import React, { cloneElement } from 'react';
import keycode from 'keycode';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';
import CustomPropTypes from './utils/CustomPropTypes';
import createChainedFunction from './utils/createChainedFunction';

import find from 'lodash/collection/find';

const TOGGLE_REF = 'toggle-btn';

export default class DropdownBase extends React.Component {
  constructor(props, Toggle=DropdownToggle) {
    super(props);

    this.Toggle = Toggle;

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.extractChildren = this.extractChildren.bind(this);

    this.refineMenu = this.refineMenu.bind(this);
    this.refineToggle = this.refineToggle.bind(this);

    this.childExtractors = [{
      key: 'toggle',
      matches: child => child.type === this.Toggle,
      refine: this.refineToggle
    }, {
      key: 'menu',
      matches: child => child.type === DropdownMenu || child.type !== MenuItem,
      refine: this.refineMenu
    }];

    this.state = {
      open: false
    };
  }

  toggleOpen() {
    let open = !this.state.open;
    this.setState({open});
  }

  handleClick(event) {
    if (event.defaultPrevented) {
      return;
    }

    this.toggleOpen();
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case keycode.codes.down:
        if (!this.state.open) {
          this.toggleOpen();
        }
        if (this.refs.menu.focusNext) {
          this.refs.menu.focusNext();
        }
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        if (this.state.open) {
          this.handleRequestClose(event);
        }
        break;
    }
  }

  handleRequestClose(event) {
    if (!this.state.open) {
      return;
    }

    this.toggleOpen();

    if (event && event.type === 'keydown' && event.keyCode === keycode.codes.esc) {
      event.preventDefault();
      event.stopPropagation();
      React.findDOMNode(this.refs[TOGGLE_REF]).focus();
    }
  }

  handleSelect(event, selectEvent) {
    if (selectEvent.isSelectionPrevented()) {
      return;
    }

    this.handleRequestClose(event);
  }

  extractChildren() {
    let open = this.props.open !== undefined ? this.props.open : this.state.open;
    let children = [];
    let set = {};

    React.Children.forEach(this.props.children, child => {
      let extractor = find(this.childExtractors, x => x.matches(child));

      if (extractor) {
        set[extractor.key] = set[extractor.key] || child;
      } else {
        children.push(child);
      }
    });

    this.childExtractors.forEach(extractor => {
      set[extractor.key] = extractor.refine(set[extractor.key], children, open);
    });

    return {
      open,
      ...set
    };
  }

  refineMenu(menu, children, open) {
    const menuProps = {
      ref: 'menu',
      open,
      labelledBy: this.props.id
    };

    if (menu === undefined) {
      menu = (
        <DropdownMenu
          {...menuProps}
          pullRight={this.props.pullRight}
          onRequestClose={createChainedFunction(
            this.props.onRequestClose,
            this.handleRequestClose
          )}
          onSelect={createChainedFunction(
            this.props.onSelect,
            this.handleSelect
          )}>
          {children}
        </DropdownMenu>
      );
    } else {
      menuProps.onRequestClose = createChainedFunction(
        menu.props.onRequestClose,
        this.props.onRequestClose,
        this.handleRequestClose
      );
      menuProps.onSelect = createChainedFunction(
        menu.props.onSelect,
        this.props.onSelect,
        this.handleSelect
      );
      menu = cloneElement(menu, menuProps, menu.props.children);
    }

    return menu;
  }

  refineToggle(toggle, children, open) {
    let toggleProps = {
      id: this.props.id,
      ref: TOGGLE_REF,
      open,
      bsStyle: this.props.bsStyle,
      useAnchor: this.useAnchor
    };

    if (toggle === undefined) {
      toggle = (
        <this.Toggle
          {...toggleProps}
          onClick={createChainedFunction(
            this.props[this.Toggle.onClickProp],
            this.handleClick
          )}
          onKeyDown={createChainedFunction(
            this.props.handleKeyDown,
            this.handleKeyDown
          )}
          noCaret={this.props.noCaret}
          title={this.props[this.Toggle.titleProp]} />
      );
    } else {
      toggleProps.onClick = createChainedFunction(
        toggle.props.onClick,
        this.props[this.Toggle.onClickProp],
        this.handleClick
      );
      toggleProps.onKeyDown = createChainedFunction(
        toggle.props.handleKeyDown,
        this.props.handleKeyDown,
        this.handleKeyDown
      );
      toggle = cloneElement(toggle, toggleProps, toggle.props.children);
    }

    return toggle;
  }
}

DropdownBase.Toggle = DropdownToggle;
DropdownBase.TOGGLE_REF = TOGGLE_REF;

function titleRequired(props, propName, component) {
  let titles = [];

  if (props.children) {
    if (props.children instanceof Array) {
      titles = props.children.filter(child => child.type.isToggle);
    } else if(props.children.type.isToggle) {
      titles.push(props.children);
    }
  }

  if (titles.length > 1) {
    return new Error(`(title|children) ${component} - Should only use one ${component}.Toggle child component, only the first ${component}.Toggle will be used`);
  }

  let title = titles[0];

  if (props.title !== undefined && title !== undefined) {
    return new Error(`(title|children) ${component} - Must provide either a 'title' prop or a '${component}.Toggle' child, not both.`);
  }

  if (props.title === undefined && title === undefined) {
    return new Error(`(title|children) ${component} - Must provide either a 'title' prop or a '${component}.Toggle' child`);
  }
}

function childrenAsArray(children) {
  if (children === undefined) {
    return [];
  }

  if (children instanceof Array) {
    return children;
  }


  return [children];
}

export function singleMenuValidation(...types) {
  return function singleMenuValidator(props, propName, component) {
    let children = childrenAsArray(props.children);
    let menus = [];

    menus = children.filter(child => types.indexOf(child.type) === -1);

    if (menus.length > 1) {
      return new Error(`(children) ${component} - Only one menu permitted (Either DropdownMenu or a custom menu)`);
    }
  };
}

export function menuWithMenuItemSiblings(...nonMenuTypes) {
  return function menuWithMenuItemSiblingsValidator(props, propName, component) {
    let children = childrenAsArray(props.children);
    let items = false;
    let menu = false;

    for (let i = 0; i < children.length; i++) {
      let child = children[i];

      if (child.type === MenuItem) {
        items = true;
      } else if (nonMenuTypes.indexOf(child.type) === -1) {
        menu = true;
      }

      if (items && menu) {
        return new Error(`(children) ${component} - MenuItems with a Menu are not allowed. MenuItems outside the Menu will be ignored.`);
      }
    }
  };
}

DropdownBase.propTypes = {
  dropup: React.PropTypes.bool,

  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,

  title: titleRequired,

  children: CustomPropTypes.all([
    titleRequired,
    singleMenuValidation(DropdownToggle, MenuItem),
    menuWithMenuItemSiblings(DropdownToggle)
  ]),

  noCaret: React.PropTypes.bool,

  pullRight: React.PropTypes.bool,
  open: React.PropTypes.bool,

  onRequestClose: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func
};
