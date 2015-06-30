import React from 'react';
import CustomPropTypes from './utils/CustomPropTypes';
import { OverlayMixin } from './OverlayMixin';

let Portal = React.createClass({

  displayName: 'Portal',

  propTypes: {
    /**
     * The DOM Node that the Component will render it's children into
     */
    container: CustomPropTypes.mountable
  },

  // we use the mixin for now, to avoid duplicating a bunch of code.
  // when the deprecation is removed we need to move the logic here from OverlayMixin
  mixins: [ OverlayMixin ],

  renderOverlay() {
    if (!this.props.children) {
      return null;
    }

    return React.Children.only(this.props.children);
  },

  render() {
    return null;
  }
});


export default Portal;
