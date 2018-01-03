import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import capitalize from './utils/capitalize';
import { DEVICE_SIZES } from './utils/StyleConfig';

const propTypes = {
  componentClass: elementType,

  /**
   * Apply clearfix
   *
   * on Extra small devices Phones
   *
   * adds class `visible-xs-block`
   */
  visibleXsBlock: PropTypes.bool,
  /**
   * Apply clearfix
   *
   * on Small devices Tablets
   *
   * adds class `visible-sm-block`
   */
  visibleSmBlock: PropTypes.bool,
  /**
   * Apply clearfix
   *
   * on Medium devices Desktops
   *
   * adds class `visible-md-block`
   */
  visibleMdBlock: PropTypes.bool,
  /**
   * Apply clearfix
   *
   * on Large devices Desktops
   *
   * adds class `visible-lg-block`
   */
  visibleLgBlock: PropTypes.bool
};

const defaultProps = {
  componentClass: 'div'
};

class Clearfix extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    DEVICE_SIZES.forEach(size => {
      const propName = `visible${capitalize(size)}Block`;
      if (elementProps[propName]) {
        classes[`visible-${size}-block`] = true;
      }

      delete elementProps[propName];
    });

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

Clearfix.propTypes = propTypes;
Clearfix.defaultProps = defaultProps;

export default bsClass('clearfix', Clearfix);
