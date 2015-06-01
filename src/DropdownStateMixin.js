import React from 'react';
import domUtils from './utils/domUtils';
import EventListener from './utils/EventListener';

/**
 * Checks whether a node is within
 * a root nodes tree
 *
 * @param {DOMElement} node
 * @param {DOMElement} root
 * @returns {boolean}
 */
function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

const DropdownStateMixin = {
  getInitialState() {
    return {
      open: false
    };
  },

  setDropdownState(newState, onStateChangeComplete) {
    if (newState) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }

    this.setState({
      open: newState
    }, onStateChangeComplete);
  },

  handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.setDropdownState(false);
    }
  },

  handleDocumentClick(e) {
    // If the click originated from within this component
    // don't do anything.
    // e.srcElement is required for IE8 as e.target is undefined
    let target = e.target || e.srcElement;
    if (isNodeInRoot(target, React.findDOMNode(this))) {
      return;
    }

    this.setDropdownState(false);
  },

  bindRootCloseHandlers() {
    let doc = domUtils.ownerDocument(this);

    this._onDocumentClickListener =
      EventListener.listen(doc, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener =
      EventListener.listen(doc, 'keyup', this.handleDocumentKeyUp);
  },

  unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
};

export default DropdownStateMixin;
