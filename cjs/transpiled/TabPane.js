"use strict";
/** @jsx React.DOM */

var React       = require('react');
var classSet    = require('react/lib/cx');

var TabPane = React.createClass({displayName: 'TabPane',
  render: function () {
    var classes = {
      'tab-pane': true,
      'open': this.props.isActive
    };

    return this.transferPropsTo(
      React.DOM.div( {className:classSet(classes)}, 
        this.props.children
      )
    );
  }
});

exports["default"] = TabPane;