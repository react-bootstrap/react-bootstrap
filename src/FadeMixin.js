import React from 'react';
import domUtils from './utils/domUtils';

// TODO: listen for onTransitionEnd to remove el
function getElementsAndSelf (root, classes){
  let els = root.querySelectorAll('.' + classes.join('.'));

  els = [].map.call(els, function(e){ return e; });

  for(let i = 0; i < classes.length; i++){
    if( !root.className.match(new RegExp('\\b' + classes[i] + '\\b'))){
      return els;
    }
  }
  els.unshift(root);
  return els;
}

export default {
  _fadeIn() {
    let els;

    if (this.isMounted()) {
      els = getElementsAndSelf(React.findDOMNode(this), ['fade']);

      if (els.length) {
        els.forEach(function (el) {
          el.className += ' in';
        });
      }
    }
  },

  _fadeOut() {
    let els = getElementsAndSelf(this._fadeOutEl, ['fade', 'in']);

    if (els.length) {
      els.forEach(function (el) {
        el.className = el.className.replace(/\bin\b/, '');
      });
    }

    setTimeout(this._handleFadeOutEnd, 300);
  },

  _handleFadeOutEnd() {
    if (this._fadeOutEl && this._fadeOutEl.parentNode) {
      this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
    }
  },

  componentDidMount() {
    if (document.querySelectorAll) {
      // Firefox needs delay for transition to be triggered
      setTimeout(this._fadeIn, 20);
    }
  },

  componentWillUnmount: function () {
    let els = getElementsAndSelf(React.findDOMNode(this), ['fade']),
        container = (this.props.container && React.findDOMNode(this.props.container)) ||
          domUtils.ownerDocument(this).body;

    if (els.length) {
      this._fadeOutEl = document.createElement('div');
      container.appendChild(this._fadeOutEl);
      this._fadeOutEl.appendChild(React.findDOMNode(this).cloneNode(true));
      // Firefox needs delay for transition to be triggered
      setTimeout(this._fadeOut, 20);
    }
  }
};
