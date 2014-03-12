define(
  ["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var React = __dependency1__["default"];

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

      handleClickOutside: function () {
        this.setDropdownState(false);
      },

      bindRootCloseHandlers: function () {
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keyup', this.handleKeyUp);
      },

      unbindRootCloseHandlers: function () {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('keyup', this.handleKeyUp);
      },

      componentWillUnmount: function () {
        this.unbindRootCloseHandlers();
      }
    };

    __exports__["default"] = DropdownStateMixin;
  });