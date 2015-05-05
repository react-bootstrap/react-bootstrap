import React from 'react';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);
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
    let children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { onKeyDown: this.props.onKeyDown }, child.children);
    });

    return (
      <ul className='dropdown-menu' role='menu' aria-labelledby={this.props.labelledBy}>
        {children}
      </ul>
    );
  }
}

DropdownMenu.propTypes = {
  onKeyDown: React.PropTypes.func,
  labelledBy: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default DropdownMenu;
