import keycode from 'keycode';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';

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
    switch (event.keyCode) {
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

    if (items.length === 0) {
      return;
    }

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
    let menuNode = ReactDOM.findDOMNode(this);

    if (menuNode === undefined) {
      return [];
    }

    return [].slice.call(menuNode.querySelectorAll('[tabIndex="-1"]'), 0);
  }

  render() {
    let {children, onSelect, pullRight, className, labelledBy, open, onClose, ...props} = this.props;

    const items = ValidComponentChildren.map(children, child => {
      let childProps = child.props || {};

      return React.cloneElement(child, {
        onKeyDown: createChainedFunction(childProps.onKeyDown, this.handleKeyDown),
        onSelect: createChainedFunction(childProps.onSelect, onSelect)
      }, childProps.children);
    });

    const classes = {
      [bootstrapUtils.prefix(this.props, 'menu')]: true,
      [bootstrapUtils.prefix(this.props, 'menu-right')]: pullRight
    };

    let list = (
      <ul
        className={classNames(className, classes)}
        role="menu"
        aria-labelledby={labelledBy}
        {...props}
      >
        {items}
      </ul>
    );

    if (open) {
      list = (
        <RootCloseWrapper noWrap onRootClose={onClose}>
          {list}
        </RootCloseWrapper>
      );
    }

    return list;
  }
}

DropdownMenu.defaultProps = {
  bsRole: 'menu',
  bsClass: 'dropdown',
  pullRight: false
};

DropdownMenu.propTypes = {
  open: PropTypes.bool,
  pullRight: PropTypes.bool,
  onClose: PropTypes.func,
  labelledBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onSelect: PropTypes.func
};

export default DropdownMenu;
