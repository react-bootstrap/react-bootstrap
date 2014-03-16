export default = {
  getComputedStyles: function (elem) {
    return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
  },

  getOffset: function (DOMNode) {
    var docElem = document.documentElement;
    var box = { top: 0, left: 0 };

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof DOMNode.getBoundingClientRect !== 'undefined' ) {
      box = DOMNode.getBoundingClientRect();
    }

    return {
      top: box.top + window.pageYOffset - docElem.clientTop,
      left: box.left + window.pageXOffset - docElem.clientLeft
    };
  },

  getPosition: function (elem) {
    var offsetParent, offset,
        parentOffset = {top: 0, left: 0};

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
    if (this.getComputedStyles(elem).position === 'fixed' ) {
      // We assume that getBoundingClientRect is available when computed position is fixed
      offset = elem.getBoundingClientRect();

    } else {
      // Get *real* offsetParent
      offsetParent = this.offsetParent(elem);

      // Get correct offsets
      offset = this.getOffset(elem);
      if ( offsetParent.nodeName !== 'HTML') {
        parentOffset = this.getOffset(offsetParent);
      }

      // Add offsetParent borders
      parentOffset.top += parseInt(this.getComputedStyles(offsetParent).borderTopWidth, 10);
      parentOffset.left += parseInt(this.getComputedStyles(offsetParent).borderLeftWidth, 10);
    }

    // Subtract parent offsets and element margins
    return {
      top: offset.top - parentOffset.top - parseInt(this.getComputedStyles(elem).marginTop, 10),
      left: offset.left - parentOffset.left - parseInt(this.getComputedStyles(elem).marginLeft, 10)
    };
  },

  offsetParent: function (elem) {
    var docElem = document.documentElement;
    var offsetParent = elem.offsetParent || docElem;

    while ( offsetParent && ( offsetParent.nodeName !== 'HTML' &&
      this.getComputedStyles(offsetParent).position === 'static' ) ) {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docElem;
  }
};