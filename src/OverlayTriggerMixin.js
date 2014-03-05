import React          from './react-es6';

export default = {
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
    // Save reference to help testing
    this._overlayInstance = React.renderComponent(this.renderOverlay(), this._overlayTarget);
  },

  _unrenderOverlay: function () {
    React.unmountComponentAtNode(this._overlayTarget);
    this._overlayInstance = null;
  }
};