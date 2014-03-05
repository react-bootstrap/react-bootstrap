define(
  ["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var React = __dependency1__["default"];

    // TODO: listen for onTransitionEnd to remove el
    __exports__["default"] = {
      _fadeIn: function () {
        var els;

        if (this.isMounted()) {
          els = this.getDOMNode().querySelectorAll('.fade');
          if (els.length) {
            Array.prototype.forEach.call(els, function (el) {
              el.className += ' in';
            });
          }
        }
      },

      _fadeOut: function () {
        var els = this._fadeOutEl.querySelectorAll('.fade.in');

        if (els.length) {
          Array.prototype.forEach.call(els, function (el) {
            el.className = el.className.replace(/\bin\b/, '');
          });
        }

        setTimeout(this._handleFadeOutEnd, 300);
      },

      _handleFadeOutEnd: function () {
        if (this._fadeOutEl && this._fadeOutEl.parentNode) {
          this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
        }
      },

      componentDidMount: function () {
        if (document.querySelectorAll) {
          // Firefox needs delay for transition to be triggered
          setTimeout(this._fadeIn, 20);
        }
      },

      componentWillUnmount: function () {
        var els = this.getDOMNode().querySelectorAll('.fade');
        if (els.length) {
          this._fadeOutEl = document.createElement('div');
          document.body.appendChild(this._fadeOutEl);
          this._fadeOutEl.innerHTML = this.getDOMNode().innerHTML;
          // Firefox needs delay for transition to be triggered
          setTimeout(this._fadeOut, 20);
        }
      }
    };
  });