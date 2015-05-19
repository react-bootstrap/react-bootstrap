import React from 'react';
import domUtils from './utils/domUtils';
import EventListener from './utils/EventListener';

// TODO: Merge this logic with dropdown logic once #526 is done.

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

export default class RootCloseWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
  }

  bindRootCloseHandlers() {
    const doc = domUtils.ownerDocument(this);

    this._onDocumentClickListener =
      EventListener.listen(doc, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener =
      EventListener.listen(doc, 'keyup', this.handleDocumentKeyUp);
  }

  handleDocumentClick(e) {
    // If the click originated from within this component, don't do anything.
    if (isNodeInRoot(e.target, React.findDOMNode(this))) {
      return;
    }

    this.props.onRootClose();
  }

  handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onRootClose();
    }
  }

  unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  }

  componentDidMount() {
    this.bindRootCloseHandlers();
  }

  render() {
    return React.Children.only(this.props.children);
  }

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
}
RootCloseWrapper.propTypes = {
  onRootClose: React.PropTypes.func.isRequired
};
