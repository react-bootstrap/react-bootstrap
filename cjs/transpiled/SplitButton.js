"use strict";
/** @jsx React.DOM */
/* global document */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var DropdownStateMixin = require("./DropdownStateMixin")["default"];
var utils = require("./utils")["default"];
var Button = require("./Button")["default"];
var ButtonGroup = require("./ButtonGroup")["default"];
var DropdownMenu = require("./DropdownMenu")["default"];

var SplitButton = React.createClass({displayName: 'SplitButton',
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:         React.PropTypes.bool,
    title:         React.PropTypes.renderable,
    href:          React.PropTypes.string,
    dropdownTitle: React.PropTypes.renderable,
    onClick:       React.PropTypes.func,
    onSelect:      React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  render: function () {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      ButtonGroup(
        {bsSize:this.props.bsSize,
        className:classSet(groupClasses)}, 
        Button(
          {ref:"button",
          href:this.props.href,
          bsStyle:this.props.bsStyle,
          onClick:this.props.onClick}, 
          this.props.title
        ),

        Button(
          {ref:"dropdownButton",
          bsStyle:this.props.bsStyle,
          className:"dropdown-toggle",
          onClick:this.handleOpenClick}, 
          React.DOM.span( {className:"sr-only"}, this.props.dropdownTitle),
          React.DOM.span( {className:"caret"} )
        ),

        DropdownMenu(
          {ref:"menu",
          onSelect:this.handleOptionSelect,
          'aria-labelledby':this.props.id,
          pullRight:this.props.pullRight}, 
          this.props.children
        )
      )
    );
  },

  handleOpenClick: function (e) {
    e.preventDefault();

    this.setDropdownState(true);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

exports["default"] = SplitButton;