import React from 'react';
import keycode from 'keycode';
import classNames from 'classnames';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
    case keycode.codes.down:
      this.focusNext();
      event.preventDefault();
      break;
    case keycode.codes.up:
      this.focusPrevious();
      event.preventDefault();
      break;
    case keycode.codes.esc:
    case keycode.codes.tab:
      this.props.onClose(event);
      break;
    default:
    }
  }

  focusNext() {
    let { items, activeItemIndex } = this.getItemsAndActiveIndex();

    if (activeItemIndex === items.length - 1) {
      items[0].focus();
      return;
    }

    items[activeItemIndex + 1].focus();
  }

  focusPrevious() {
    let { items, activeItemIndex } = this.getItemsAndActiveIndex();

    if (activeItemIndex === 0) {
      items[items.length - 1].focus();
      return;
    }

    items[activeItemIndex - 1].focus();
  }

  getItemsAndActiveIndex() {
    let items = this.getFocusableMenuItems();
    let activeElement = document.activeElement;
    let activeItemIndex = items.indexOf(activeElement);

    return {items, activeItemIndex};
  }

  getFocusableMenuItems() {
    let menuNode = React.findDOMNode(this);

    if (menuNode === undefined) {
      return [];
    }

    return [].slice.call(menuNode.querySelectorAll('[tabIndex="-1"]'), 0);
  }

  render() {
    const items = ValidComponentChildren.map(this.props.children, child => {
      let {
        children,
        onKeyDown,
        onSelect
      } = child.props || {};

      return React.cloneElement(child, {
        onKeyDown: createChainedFunction(onKeyDown, this.handleKeyDown),
        onSelect: createChainedFunction(onSelect, this.props.onSelect)
      }, children);
    });

    const classes = {
      'dropdown-menu': true,
      'dropdown-menu-right': this.props.pullRight
    };

    let list = (
      <ul
        className={classNames(this.props.className, classes)}
        role="menu"
        aria-labelledby={this.props.labelledBy}
      >
        {items}
      </ul>
    );

    if (this.props.open) {
      list = (
        <RootCloseWrapper noWrap onRootClose={this.props.onClose}>
          {list}
        </RootCloseWrapper>
      );
    }

    return list;
  }
}

DropdownMenu.defaultProps = {
  bsRole: 'menu',
  pullRight: false
};

DropdownMenu.propTypes = {
  open: React.PropTypes.bool,
  pullRight: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  labelledBy: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  onSelect: React.PropTypes.func
};

export default DropdownMenu;
