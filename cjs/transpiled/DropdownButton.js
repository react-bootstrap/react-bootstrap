"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var DropdownStateMixin = require("./DropdownStateMixin")["default"];
var Button = require("./Button")["default"];
var ButtonGroup = require("./ButtonGroup")["default"];
var DropdownMenu = require("./DropdownMenu")["default"];


var DropdownButton = React.createClass({displayName: 'DropdownButton',
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:    React.PropTypes.bool,
    title:    React.PropTypes.renderable,
    href:     React.PropTypes.string,
    onClick:  React.PropTypes.func,
    onSelect: React.PropTypes.func
  },

  render: function () {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    var className = this.props.className ?
      this.props.className + ' dropdown-toggle' : 'dropdown-toggle';

    return (
      ButtonGroup(
        {bsSize:this.props.bsSize,
        className:classSet(groupClasses)}, 
        Button(
          {ref:"dropdownButton",
          href:this.props.href,
          bsStyle:this.props.bsStyle,
          className:className,
          onClick:this.handleOpenClick}, 
          this.props.title,' ',
          React.DOM.span( {className:"caret"} )
        ),

        DropdownMenu(
          {ref:"menu",
          'aria-labelledby':this.props.id,
          onSelect:this.handleOptionSelect,
          pullRight:this.props.pullRight}, 
          this.props.children
        )
      )
    );
  },

  handleOpenClick: function () {
    this.setDropdownState(true);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

exports["default"] = DropdownButton;