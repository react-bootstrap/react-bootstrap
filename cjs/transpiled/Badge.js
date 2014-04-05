"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];

var Badge = React.createClass({displayName: 'Badge',

  render: function () {
    return this.transferPropsTo(
      React.DOM.span( {className:"badge"}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Badge;