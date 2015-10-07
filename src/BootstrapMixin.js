import React from 'react';
import styleMaps from './styleMaps';
import keyOf from 'react-prop-types/lib/keyOf';

const BootstrapMixin = {
  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: keyOf(styleMaps.CLASSES),
    /**
     * Style variants
     * @type {("default"|"primary"|"success"|"info"|"warning"|"danger"|"link")}
     */
    bsStyle: React.PropTypes.oneOf(styleMaps.STYLES),
    /**
     * Size variants
     * @type {("xsmall"|"small"|"medium"|"large"|"xs"|"sm"|"md"|"lg")}
     */
    bsSize: keyOf(styleMaps.SIZES)
  },

  getBsClassSet() {
    let classes = {};

    let bsClass = this.props.bsClass && styleMaps.CLASSES[this.props.bsClass];
    if (bsClass) {
      classes[bsClass] = true;

      let prefix = bsClass + '-';

      let bsSize = this.props.bsSize && styleMaps.SIZES[this.props.bsSize];
      if (bsSize) {
        classes[prefix + bsSize] = true;
      }

      if (this.props.bsStyle) {
        if (styleMaps.STYLES.indexOf(this.props.bsStyle) >= 0) {
          classes[prefix + this.props.bsStyle] = true;
        } else {
          classes[this.props.bsStyle] = true;
        }
      }
    }

    return classes;
  },

  prefixClass(subClass) {
    return styleMaps.CLASSES[this.props.bsClass] + '-' + subClass;
  }
};

export default BootstrapMixin;
