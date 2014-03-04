"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var FadeMixin = require("./FadeMixin")["default"];


// TODO:
// - aria-labelledby
// - Add `modal-body` div if only one child passed in that doesn't already have it
// - Tests

var Modal = React.createClass({displayName: 'Modal',
  mixins: [BootstrapMixin, FadeMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true
    };
  },

  componentDidMount: function () {
    document.addEventListener('keyup', this.handleKeyUp);
  },

  componentWillUnmount: function () {
    document.removeEventListener('keyup', this.handleKeyUp);
  },

  killClick: function (e) {
    e.stopPropagation();
  },

  handleBackdropClick: function () {
    this.props.onRequestHide();
  },

  handleKeyUp: function (e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onRequestHide();
    }
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['fade'] = this.props.fade;
    if (!document.querySelectorAll) {
      classes['in'] = this.props.fade;
    }

    var modal = this.transferPropsTo(
      React.DOM.div(
        {bsClass:"modal",
        tabIndex:"-1",
        role:"dialog",
        style:{display: 'block'},
        className:classSet(classes),
        onClick:this.handleBackdropClick,
        ref:"modal"}
      , 
        React.DOM.div( {className:"modal-dialog"}, 
          React.DOM.div( {className:"modal-content", onClick:this.killClick}, 
            this.props.title ? this.renderHeader() : null,
            this.props.children
          )
        )
      )
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal) : modal;
  },

  renderBackdrop: function (modal) {
    var classes = {
      'modal-backdrop': true,
      'fade': this.props.fade
    };

    if (!document.querySelectorAll) {
      classes['in'] = this.props.fade;
    }

    return (
      React.DOM.div(null, 
        React.DOM.div( {className:classSet(classes), ref:"backdrop"} ),
        modal
      )
    );
  },

  renderHeader: function () {
    return (
      React.DOM.div( {className:"modal-header"}, 
        React.DOM.button( {type:"button", className:"close", 'aria-hidden':"true", onClick:this.props.onRequestHide}, "×"),
        this.renderTitle()
      )
    );
  },

  renderTitle: function () {
    return (
      React.isValidComponent(this.props.title) ?
        this.props.title : React.DOM.h4( {className:"modal-title"}, this.props.title)
    );
  }
});

exports["default"] = Modal;