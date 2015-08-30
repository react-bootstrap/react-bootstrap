import { PropTypes } from 'react';
import styleMaps from '../styleMaps';
import keyOf from 'react-prop-types/lib/keyOf';
import invariant from 'react/lib/invariant';

function prefix(props = {}, variant) {
  invariant((props.bsClass || '').trim(), 'Must provide a bsClass for components');
  return props.bsClass + (variant ? '-' + variant : '');
}

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

  prefix,

  getClassSet(props) {
    let classes = {};
    let bsClass = (props.bsClass || '').trim();

    if (bsClass) {
      classes[bsClass] = true;

      let bsSize = props.bsSize && styleMaps.SIZES[props.bsSize];

      if (bsSize) {
        classes[prefix(props, bsSize)] = true;
      }

      if (props.bsStyle) {
        classes[prefix(props, props.bsStyle)] = true;
      }
    }

    return classes;
  }
};
