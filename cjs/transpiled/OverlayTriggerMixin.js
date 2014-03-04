"use strict";
var React = require("./react-es6")["default"];

exports["default"] = {
  componentWillUnmount: function () {
    this._unrenderOverlay();
    document.body.removeChild(this._overlayTarget);
  },

  componentDidUpdate: function () {
    this._renderOverlay();
  },

  componentDidMount: function () {
    this._overlayTarget = document.createElement('div');
    document.body.appendChild(this._overlayTarget);
    this._renderOverlay();
  },

  _renderOverlay: function () {
    React.renderComponent(this.renderOverlay(), this._overlayTarget);
  },

  _unrenderOverlay: function () {
    React.unmountComponentAtNode(this._overlayTarget);
  }
};