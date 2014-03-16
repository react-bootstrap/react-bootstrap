"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var AffixMixin = require("./AffixMixin")["default"];
var domUtils = require("./domUtils")["default"];

var Affix = React.createClass({displayName: 'Affix',
  statics: {
    domUtils: domUtils
  },

  mixins: [AffixMixin],

  render: function () {
    return this.transferPropsTo(
      React.DOM.div( {className:this.state.affixClass, style:{top: this.state.affixPositionTop}}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Affix;