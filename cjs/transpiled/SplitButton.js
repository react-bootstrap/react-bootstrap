"use strict";
/** @jsx React.DOM */

var React             = require('react');
var classSet          = require('react/lib/cx');
var BootstrapMixin = require("./BootstrapMixin")["default"];
var Button = require("./Button")["default"];
var DropdownButton = require("./DropdownButton")["default"];

var SplitButton = React.createClass({displayName: 'SplitButton',
  mixins: [BootstrapMixin],

  propTypes: {
    title: React.PropTypes.renderable.isRequired,
    dropdownTitle: React.PropTypes.renderable,
    bsVariation: React.PropTypes.oneOf(['dropup']),
    isInInputGroup: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onOptionClick: React.PropTypes.func,
    options: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  handleClick: function () {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  },

  handleOptionClick: function (key) {
    if (typeof this.props.onOptionClick === 'function') {
      this.props.onOptionClick(key);
    }
  },

  render: function () {
    var classes = {};

    classes[this.state.className] = true;
    classes['btn-group'] = !this.props.isInInputGroup;
    classes['input-group-btn'] = this.props.isInInputGroup;

    if (this.props.bsVariation) {
      classes[this.props.bsVariation] = true;
    }

    return (
      React.DOM.div( {className:classSet(classes)}, 
        this.transferPropsTo(Button( {onClick:this.handleClick}, this.props.title)),
        this.transferPropsTo(
          DropdownButton(
            {title:this.props.dropdownTitle,
            isTitleHidden:true,
            onClick:this.handleOptionClick,
            options:this.props.options}
          )
        )
      )
    );
  }
});

exports["default"] = SplitButton;