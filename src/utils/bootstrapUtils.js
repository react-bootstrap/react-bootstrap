import { PropTypes } from 'react';
import styleMaps from '../styleMaps';
import keyOf from 'react-prop-types/lib/keyOf';

export default {

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
    bsStyle: PropTypes.oneOf(styleMaps.STYLES),

    /**
     * Size variants
     * @type {("xsmall"|"small"|"medium"|"large"|"xs"|"sm"|"md"|"lg")}
     */
    bsSize: keyOf(styleMaps.SIZES)
  },

  getClassSet(props) {
    let classes = {};
    let bsClass;

    if (props.bsClass && styleMaps.CLASSES[props.bsClass]) {
      bsClass = styleMaps.CLASSES[props.bsClass];
    }

    if (bsClass) {
      classes[bsClass] = true;

      let prefix = bsClass + '-';

      let bsSize = props.bsSize && styleMaps.SIZES[props.bsSize];

      if (bsSize) {
        classes[prefix + bsSize] = true;
      }

      if (props.bsStyle) {
        if (styleMaps.STYLES.indexOf(props.bsStyle) >= 0) {
          classes[prefix + props.bsStyle] = true;
        } else {
          classes[props.bsStyle] = true;
        }
      }
    }

    return classes;
  },

  prefix(props, variant) {
    return styleMaps.CLASSES[props.bsClass] + '-' + variant;
  }
};
