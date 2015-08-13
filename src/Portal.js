import React from 'react';
import ReactDOM from 'react-dom';

import CustomPropTypes from './utils/CustomPropTypes';
import domUtils from './utils/domUtils';

let Portal = React.createClass({

  displayName: 'Portal',

  propTypes: {
    /**
     * The DOM Node that the Component will render it's children into
     */
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
    this._unmountOverlayTarget();
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
    let overlay = !this.props.children
      ? null
      : React.Children.only(this.props.children);

    // Save reference for future access.
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
        this, overlay, this._overlayTarget
      );
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  },

  _unrenderOverlay() {
    if (this._overlayTarget) {
      ReactDOM.unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    }
  },

  render() {
    return null;
  },

  getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this._overlayInstance) {
      if (this._overlayInstance.getWrappedDOMNode) {
        return this._overlayInstance.getWrappedDOMNode();
      } else {
        return ReactDOM.findDOMNode(this._overlayInstance);
      }
    }

    return null;
  },

  getContainerDOMNode() {
    return ReactDOM.findDOMNode(this.props.container) || domUtils.ownerDocument(this).body;
  }
});

export default Portal;
