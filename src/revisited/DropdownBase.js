import React, { cloneElement } from 'react';
import keycode from 'keycode';
import uuid from 'uuid';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';
import CustomPropTypes from '../utils/CustomPropTypes';
import createChainedFunction from '../utils/createChainedFunction';

const TOGGLE_REF = 'toggle-btn';

export default class DropdownBase extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.extractChildren = this.extractChildren.bind(this);

    this.ensureMenuProps = this.ensureMenuProps.bind(this);
    this.ensureToggleProps = this.ensureToggleProps.bind(this);

    this.state = {
      open: false,
      id: props.id || uuid.v4()
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
    const id = this.props.id || this.state.id;

    let children = [];
    let menu;
    let toggle;

    React.Children.forEach(this.props.children, child => {
      if (child.type === DropdownToggle) {
        toggle = toggle || child;
      } else if (child.type === DropdownMenu || child.type !== MenuItem) {
        menu = menu || child;
      } else {
        children.push(child);
      }
    });

    return {
      toggle: this.ensureToggleProps(toggle, id),
      menu: this.ensureMenuProps(menu, children, id)
    };
  }

  ensureMenuProps(menu, children, id) {
    const menuProps = {
      ref: 'menu',
      open: this.state.open,
      labelledBy: id
    };

    if (menu === undefined) {
      menu = (
        <DropdownMenu
          {...menuProps}
          pullRight={this.props.pullRight}
          requestClose={this.handleRequestClose}
          onSelect={createChainedFunction(this.props.onSelect, this.handleSelect)}>
          {children}
        </DropdownMenu>
      );
    } else {
      menuProps.requestClose = createChainedFunction(menu.props.handleRequestClose, this.handleRequestClose);
      menuProps.onSelect = createChainedFunction(menu.props.onSelect, this.props.onSelect, this.handleSelect);
      menu = cloneElement(menu, menuProps, menu.props.children);
    }

    return menu;
  }

  ensureToggleProps(toggle, id) {
    let toggleProps = {
      id,
      ref: TOGGLE_REF,
      open: this.state.open
    };

    if (toggle === undefined) {
      toggle = (
        <DropdownToggle
          {...toggleProps}
          onClick={createChainedFunction(this.props.onClick, this.handleClick)}
          onKeyDown={this.handleKeyDown}
          noCaret={this.props.noCaret}
          title={this.props.title} />
      );
    } else {
      toggleProps.onClick = createChainedFunction(toggle.props.onClick, this.props.onClick, this.handleClick);
      toggleProps.onKeyDown = createChainedFunction(toggle.props.handleKeyDown, this.handleKeyDown);
      toggle = cloneElement(toggle, toggleProps, toggle.props.children);
    }

    return toggle;
  }
}

DropdownBase.Toggle = DropdownToggle;

function titleRequired(props, propName, component) {
  let titles = [];

  if (props.children) {
    if (props.children instanceof Array) {
      titles = props.children.filter(child => child.type === DropdownToggle);
    } else if(props.children.type === DropdownToggle) {
      titles.push(props.children);
    }
  }

  if (titles.length > 1) {
    return new Error(`(title|children) ${component} - Should only use one ${component}.Toggle child component, only the first DropdownButton.Toggle will be used`);
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

function singleMenuValidation(props, propName, component) {
  let children = childrenAsArray(props.children);
  let menus = [];

  menus = children.filter(child => child.type !== DropdownToggle && child.type !== MenuItem);

  if (menus.length > 1) {
    return new Error(`(children) ${component} - Only one menu permitted (Either DropdownMenu or a custom menu)`);
  }
}

function menuWithMenuItemSiblings(props, propName, component) {
  let children = childrenAsArray(props.children);
  let items = false;
  let menu = false;

  for (let i = 0; i < children.length; i++) {
    let child = children[i];

    if (child.type === MenuItem) {
      items = true;
    } else if (child.type !== DropdownToggle) {
      menu = true;
    }

    if (items && menu) {
      return new Error(`(children) ${component} - MenuItems with a Menu are not allowed. MenuItems outside the Menu will be ignored.`);
    }
  }
}

DropdownBase.propTypes = {
  dropup: React.PropTypes.bool,

  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),

  title: titleRequired,

  children: CustomPropTypes.all([
    titleRequired,
    singleMenuValidation,
    menuWithMenuItemSiblings
  ]),

  noCaret: React.PropTypes.bool,

  pullRight: React.PropTypes.bool,

  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func
};
