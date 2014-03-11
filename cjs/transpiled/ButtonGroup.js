"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var Button = require("./Button")["default"];

var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
  mixins: [BootstrapMixin],

  propTypes: {
    vertical:  React.PropTypes.bool,
    justified: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button-group'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;

    return this.transferPropsTo(
      React.DOM.div(
        {className:classSet(classes)}, 
        this.props.children
      )
    );
  }
});

exports["default"] = ButtonGroup;