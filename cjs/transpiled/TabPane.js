"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];

var TabPane = React.createClass({displayName: 'TabPane',
  render: function () {
    var classes = {
      'tab-pane': true,
      'active': this.props.isActive
    };

    return this.transferPropsTo(
      React.DOM.div( {className:classSet(classes)}, 
        this.props.children
      )
    );
  }
});

exports["default"] = TabPane;