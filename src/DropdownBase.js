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
    this.handleClose = this.handleClose.bind(this);
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

    this.state = {};
  }

  componentDidMount() {
    let menu = this.refs.menu;
    if (this.props.open && menu.focusNext) {
      menu.focusNext()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let menu = this.refs.menu;
    if (this.props.open && !prevProps.open && menu.focusNext) {
      menu.focusNext()
    }
  }

  toggleOpen() {
    let open = !this.props.open;

    if (this.props.onToggle){
      this.props.onToggle(open)
    }
  }

  handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen();
  }

  handleKeyDown(event) {
    let focusNext = ()=> {
      if (this.refs.menu.focusNext) {
        this.refs.menu.focusNext();
      }
    }

    switch(event.keyCode) {
      case keycode.codes.down:
        if (!this.props.open) {
          this.toggleOpen();
        }
        else {
          focusNext()
        }
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        if (this.props.open) {
          this.handleClose(event);
        }
        break;
    }
  }

  handleClose(event) {
    if (!this.props.open) {
      return;
    }

    // we need to let the current event finish before closing the menu.
    // otherwise the menu may close, shifting focus to document.body, before focus has moved
    // to the next focusable input
    if (event && event.keyCode === keycode.codes.tab){
      setTimeout(this.toggleOpen);
    }
    else {
      this.toggleOpen();
    }

    if (event && event.type === 'keydown' && event.keyCode === keycode.codes.esc) {
      let toggle = React.findDOMNode(this.refs[TOGGLE_REF])
      event.preventDefault();
      event.stopPropagation();
      toggle.focus();
    }
  }

  extractChildren() {
    let open = !!this.props.open;
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
          onClose={createChainedFunction(
            this.props.onClose,
            this.handleClose
          )}
          onSelect={createChainedFunction(
            this.props.onSelect,
            this.handleClose
          )}
        >
          {children}
        </DropdownMenu>
      );
    } else {
      menuProps.onClose = createChainedFunction(
        menu.props.onClose,
        this.props.onClose,
        this.handleClose
      );
      menuProps.onSelect = createChainedFunction(
        menu.props.onSelect,
        this.props.onSelect,
        this.handleClose
      );

      menu = cloneElement(menu, menuProps, menu.props.children);
    }

    return menu;
  }

  refineToggle(toggle, children, open) {
    let toggleProps = {
      open,
      id: this.props.id,
      ref: TOGGLE_REF,
      bsStyle: this.props.bsStyle,
      disabled: this.props.disabled,
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
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: React.PropTypes.bool,

  /**
     * An html id attribute, necessary for assistive technologies, such as screen readers.
     * @type {string|number}
     * @required
     */
  id: CustomPropTypes.isRequiredForA11y(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  ),

  /**
   * Specify the content of the Dropdown button.
   * @type {node}
   */
  title: titleRequired,

  /**
   * The children of a Dropdown may be `<MenuItem/>`s, a `<Dropdown.Toggle/>` or a `<DropdownMenu/>`.
   * @type {node}
   */
  children: CustomPropTypes.all([
    titleRequired,
    singleMenuValidation(DropdownToggle, MenuItem),
    menuWithMenuItemSiblings(DropdownToggle)
  ]),

  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: React.PropTypes.bool,

  /**
   * Align the menu to the right  side of the Dropdown toggle
   */
  pullRight: React.PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: React.PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value.
   *
   * ```js
   * function(Boolean isOpen){}
   * ```
   * @controllable open
   */
  onToggle: React.PropTypes.func,


  /**
   * @private
   */
  onClick: React.PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * function(Object event, Any eventKey)
   * ```
   */
  onSelect: React.PropTypes.func
};

