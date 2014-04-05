"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];

var Jumbotron = React.createClass({displayName: 'Jumbotron',

  render: function () {
    return this.transferPropsTo(
      React.DOM.div( {className:"jumbotron"}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Jumbotron;