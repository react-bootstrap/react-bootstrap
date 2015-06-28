import React from 'react';
import CustomPropTypes from './utils/CustomPropTypes';
import domUtils from './utils/domUtils';
import deprecationWarning from './utils/deprecationWarning';

export const OverlayMixin = {
  propTypes: {

    container: CustomPropTypes.mountable
  },


  componentDidMount() {
    this._renderOverlay();
  },

  componentDidUpdate() {
    this._renderOverlay();
  },

  componentWillUnmount() {
    this._unrenderOverlay();
    this._mountOverlayTarget();
  },

  _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div');
      this.getContainerDOMNode()
        .appendChild(this._overlayTarget);
    }
  },

  _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this.getContainerDOMNode()
        .removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
  },

  _renderOverlay() {
    if (!this._overlayTarget) {
      this._mountOverlayTarget();
    }

    let overlay = this.renderOverlay();

    // Save reference to help testing
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = React.render(overlay, this._overlayTarget);
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  },

  _unrenderOverlay() {
    React.unmountComponentAtNode(this._overlayTarget);
    this._overlayInstance = null;
  },

  getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this._overlayInstance) {
      return React.findDOMNode(this._overlayInstance);
    }

    return null;
  },

  getContainerDOMNode() {
    return React.findDOMNode(this.props.container) || domUtils.ownerDocument(this).body;
  }
};

export default {

  ...OverlayMixin,

  componentWillMount() {
    deprecationWarning(
        'Overlay mixin', 'the `<Portal/>` Component'
      , 'http://react-bootstrap.github.io/components.html#modals-custom');
  }
};
