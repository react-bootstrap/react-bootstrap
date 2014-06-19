import React          from './react-es6';
import EventListener  from './react-es6/lib/EventListener';

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

var DropdownStateMixin = {
  getInitialState: function () {
    return {
      open: false
    };
  },

  setDropdownState: function (newState, onStateChangeComplete) {
    if (newState) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }

    this.setState({
      open: newState
    }, onStateChangeComplete);
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.setDropdownState(false);
    }
  },

  handleDocumentClick: function (e) {
    // If the click originated from within this component
    // don't do anything.
    if (isNodeInRoot(e.target, this.getDOMNode())) {
      return;
    }

    this.setDropdownState(false);
  },

  bind: function(target, eventType, callback) {
    this.eventListeners = this.eventListeners || [];
    var listener = EventListener.listen(target, eventType, callback);
    this.eventListeners.push(listener);
  },

  bindRootCloseHandlers: function () {
    this.bind(document, 'click', this.handleDocumentClick);
    this.bind(document, 'keyup', this.handleKeyUp);
  },

  unbindRootCloseHandlers: function () {
    if (!this.eventListeners) return;
    var listener;
    while (listener = this.eventListeners.shift()) {
      listener.remove();
    }
  },

  componentWillUnmount: function () {
    this.unbindRootCloseHandlers();
  }
};

export default = DropdownStateMixin;