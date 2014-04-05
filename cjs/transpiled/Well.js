"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];

var Well = React.createClass({displayName: 'Well',
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'well'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      React.DOM.div( {className:classSet(classes)}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Well;