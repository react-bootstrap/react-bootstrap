import React          from './react-es6';

// TODO: listen for onTransitionEnd to remove el
export default = {
  _fadeIn: function () {
    var els;

    if (this.isMounted()) {
      els = this.getDOMNode().querySelectorAll('.fade');
      if (els) {
        Array.prototype.forEach.call(els, function (el) {
          el.className += ' in';
        });
      }
    }
  },

  _fadeOut: function () {
    var els = this._fadeOutEl.querySelectorAll('.fade.in');

    if (els) {
      Array.prototype.forEach.call(els, function (el) {
        el.className = el.className.replace(/\bin\b/, '');
      });
    }

    setTimeout(this._handleFadeOutEnd, 300);
  },

  _handleFadeOutEnd: function () {
    this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
  },

  componentDidMount: function () {
    if (document.querySelectorAll) {
      setTimeout(this._fadeIn, 0);
    }
  },

  componentWillUnmount: function () {
    var els = this.getDOMNode().querySelectorAll('.fade');

    if (els) {
      this._fadeOutEl = document.createElement('div');
      document.body.appendChild(this._fadeOutEl);
      this._fadeOutEl.innerHTML = this.getDOMNode().innerHTML;
      setTimeout(this._fadeOut, 0);
    }
  }
};