"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var Button = require("./Button")["default"];

var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      React.DOM.div(
        {role:"toolbar",
        className:classSet(classes)}, 
        this.props.children
      )
    );
  }
});

exports["default"] = ButtonGroup;