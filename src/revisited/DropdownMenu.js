import React from 'react';
import domUtils from '../utils/domUtils';
import EventListener from '../utils/EventListener';
import keycode from 'keycode';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.bindRootCloseHandler = this.bindRootCloseHandler.bind(this);
    this.unbindRootCloseHandler = this.unbindRootCloseHandler.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.open) {
      this.bindRootCloseHandler();
    } else {
      this.unbindRootCloseHandler();
    }
  }

  bindRootCloseHandler() {
    let ownerDocument = domUtils.ownerDocument(this);

    this._onDocumentClickListener =
      EventListener.listen(ownerDocument, 'click', this.handleDocumentClick);
  }

  unbindRootCloseHandler() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }
  }

  componentWillUnmount() {
    this.unbindRootCloseHandler();
  }

  handleDocumentClick(event) {
    let inTree = domUtils.isNodeInTree(event.target, React.findDOMNode(this));
    if (this.props.requestClose && !inTree) {
      this.props.requestClose();
    }
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
        this.props.requestClose(event);
        break;
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
    let children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        onKeyDown: this.handleKeyDown
      }, child.props.children);
    });

    return (
      <ul className='dropdown-menu' role='menu' aria-labelledby={this.props.labelledBy}>
        {children}
      </ul>
    );
  }
}

DropdownMenu.propTypes = {
  open: React.PropTypes.bool,
  requestClose: React.PropTypes.func,
  labelledBy: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default DropdownMenu;
