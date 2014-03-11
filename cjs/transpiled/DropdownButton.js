"use strict";
/** @jsx React.DOM */
/* global document */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var Button = require("./Button")["default"];
var DropdownMenu = require("./DropdownMenu")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var utils = require("./utils")["default"];


var DropdownButton = React.createClass({displayName: 'DropdownButton',
  mixins: [BootstrapMixin],

  propTypes: {
    dropup: React.PropTypes.bool,
    right: React.PropTypes.bool
  },

  getInitialState: function () {
    return {
      open: false
    };
  },

  toggle: function (open) {
    var newState = (open === undefined) ?
          !this.state.open : open;

    if (newState) {
      this.bindCloseHandlers();
    } else {
      this.unbindCloseHandlers();
    }

    this.setState({
      open: newState
    });
  },

  handleClick: function () {
    this.toggle();
  },

  handleOptionSelect: function (key) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(key);
    }
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.toggle(false);
    }
  },

  handleClickOutside: function () {
    if (!this._clickedInside) {
      this.toggle(false);
    }
  },

  bindCloseHandlers: function () {
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keyup', this.handleKeyUp);
  },

  unbindCloseHandlers: function () {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keyup', this.handleKeyUp);
  },

  componentWillUnmount: function () {
    this.unbindCloseHandlers();
  },

  render: function () {
    var groupClassName = classSet({
        'btn-group': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      });

    var button = this.transferPropsTo(
        Button(
          {ref:"button",
          className:"dropdown-toggle",
          onClick:this.handleClick}, 
          this.props.title + ' ',React.DOM.span( {className:"caret"} )
        )
    );

    return (
      React.DOM.div( {className:groupClassName}, 
        button,
        DropdownMenu(
          {ref:"menu",
          'aria-labelledby':this.props.id,
          right:this.props.right}, 
          utils.modifyChildren(this.props.children, this.renderMenuItem)
        )
      )
    );
  },

  renderMenuItem: function (child, i) {
    return utils.cloneWithProps(
        child,
        {
          ref: child.props.ref || 'menuItem' + (i + 1),
          key: child.props.key,
          onSelect: this.handleOptionSelect.bind(this, child.props.key)
        }
      );
  }
});

exports["default"] = DropdownButton;