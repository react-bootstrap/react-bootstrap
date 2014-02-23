"use strict";
var React = require("./react-es6")["default"];

exports["default"] = {
  componentWillUnmount: function () {
    this._unrenderLayer();
    document.body.removeChild(this._target);
  },

  componentDidUpdate: function () {
    this._renderLayer();
  },

  componentDidMount: function () {
    this._target = document.createElement('div');
    document.body.appendChild(this._target);
    this._renderLayer();
  },

  _renderLayer: function () {
    React.renderComponent(this.renderLayer(), this._target);
  },
  
  _unrenderLayer: function () {
    React.unmountComponentAtNode(this._target);
  }
};