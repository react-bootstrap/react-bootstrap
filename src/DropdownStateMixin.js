import React     from './react-es6';

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

  bindEvent: function (el, eventName, eventHandler) {
    if (el.addEventListener){
      el.addEventListener(eventName, eventHandler, false); 
    } else if (el.attachEvent){
      el.attachEvent('on' + eventName, eventHandler);
    }
  },

  unbindEvent: function (el, eventName, eventHandler) {
    if (el.removeEventListener){
      el.removeEventListener(eventName, eventHandler, false); 
    } else if (el.detachEvent){
      el.detachEvent('on' + eventName, eventHandler);
    }
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.setDropdownState(false);
    }
  },

  handleClickOutside: function () {
    this.setDropdownState(false);
  },

  bindRootCloseHandlers: function () {
    this.bindEvent(document, 'click', this.handleClickOutside);
    this.bindEvent(document, 'keyup', this.handleKeyUp);
  },

  unbindRootCloseHandlers: function () {
    this.unbindEvent(document, 'click', this.handleClickOutside);
    this.unbindEvent(document, 'keyup', this.handleKeyUp);
  },

  componentWillUnmount: function () {
    this.unbindRootCloseHandlers();
  }
};

export default = DropdownStateMixin;