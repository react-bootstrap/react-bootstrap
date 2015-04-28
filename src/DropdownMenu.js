import React, { cloneElement } from 'react';
import classNames from 'classnames';

import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

const traverseKeys = [38, 40];

const DropdownMenu = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    style: React.PropTypes.object
  },

  handleMenuKeyDown(event) {

    if (event.keyCode === 13) {
      return;
    }

    event.preventDefault();

    // Go to previous item if possible
    if (event.keyCode === traverseKeys[0]) {
      this.focusPrevious();
    }

    // Go to next item if possible
    if (event.keyCode === traverseKeys[1]) {
      this.focusNext();
    }
  },

  getFocusableMenuItems() {

    // Grab hyperlinks and convert to array
    return [].slice.call(this.getDOMNode().querySelectorAll('a'), 0);
  },

  focusNext() {

    let activeElement = document.activeElement;
    let items = this.getFocusableMenuItems();
    let activeItemIndex = items.indexOf(activeElement);

    if (activeItemIndex !== items.length - 1) {
      items[activeItemIndex + 1].focus();
    }

  },

  focusPrevious() {

    let activeElement = document.activeElement;
    let items = this.getFocusableMenuItems();
    let activeItemIndex = items.indexOf(activeElement);

    if (activeItemIndex === -1) {
      items[items.length - 1].focus();
    } else if (activeItemIndex !== 0) {
      items[activeItemIndex - 1].focus();
    }

  },

  render() {
    let classes = {
        'dropdown-menu': true,
        'dropdown-menu-right': this.props.pullRight
      };

    // Remove outline on focus by default
    let style = this.props.style || {};
    style.outline = style.outline || 'none';

    // Adding tabIndex -1 to allow for focus, but not tabable
    return (
        <ul
          tabIndex="-1"
          onKeyDown={this.handleMenuKeyDown}
          {...this.props}
          className={classNames(this.props.className, classes)}
          role="menu"
          style={style}>
          {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
        </ul>
      );
  },

  renderMenuItem(child, index) {
    return cloneElement(
      child,
      {

        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index

      }
    );
  }
});

export default DropdownMenu;
