"use strict";
var React = require("./react-es6")["default"];
var constants = require("./constants")["default"];

var BootstrapMixin = {
  propTypes: {
    bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
    bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
    bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES)),
    bsGlyph: React.PropTypes.oneOf(Object.keys(constants.GLYPHS))
  },

  getBsClassSet: function () {
    var classes = {};

    var bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
    if (bsClass) {
      classes[bsClass] = true;

      var prefix = bsClass + '-';

      var bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
      if (bsSize) {
        classes[prefix + bsSize] = true;
      }

      var bsGlyph = this.props.bsGlyph && constants.GLYPHS[this.props.bsGlyph];
      if (bsGlyph) {
        classes[prefix + bsGlyph] = true;
      }

      var bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
      if (this.props.bsStyle) {
        classes[prefix + bsStyle] = true;
      }
    }

    return classes;
  }
};

exports["default"] = BootstrapMixin;