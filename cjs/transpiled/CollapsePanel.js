"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];

var CollapsePanel  = React.createClass({displayName: 'CollapsePanel',
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'panel',
      headingClass: React.DOM.h4,
      isStateful: true
    }
  },

  getInitialState: function () {
    return {
      isOpen: this.props.isOpen
    }
  },

  handleClick: function (e) {
    e.preventDefault();

    if (this.props.isStateful) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  },

  render: function () {
    var HeadingClass = this.props.headingClass;

    var isOpen = (this.props.isStateful) ?
      this.state.isOpen : this.props.isOpen;

    var panelClassName = classSet(this.getBsClassSet());

    var anchorClassName = classSet({
      "collapsed": !isOpen
    });

    var collapseClassName = classSet({
      "panel-collapse": true,
      "in": isOpen,
      "collapse": !isOpen
    });

    return this.transferPropsTo(
      React.DOM.div( {className:panelClassName}, 
        React.DOM.div( {className:"panel-heading"}, 
          HeadingClass(
            {className:"panel-title"}, 
            React.DOM.a(
              {href:this.props.id ? '#' + this.props.id : '#',
              className:anchorClassName,
              onClick:this.handleClick}, 
              this.props.headingChildren
            )
          )
        ),
        React.DOM.div( {className:collapseClassName, id:this.props.id}, 
          React.DOM.div( {className:"panel-body"}, 
            this.props.children
          )
        )
      )
    );
  }
});

exports["default"] = CollapsePanel;