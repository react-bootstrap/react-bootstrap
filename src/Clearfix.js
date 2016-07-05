import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';
import capitalize from './utils/capitalize';
import { DEVICE_SIZES } from './utils/StyleConfig';

const propTypes = {
  componentClass: elementType,

  // TODO: These should be `visibleSz`, not `visibleSzBlock`.

  /**
   * Apply clearfix
   *
   * on Extra small devices Phones
   *
   * adds class `visible-xs-block`
   */
  visibleXsBlock: React.PropTypes.bool,
  /**
   * Apply clearfix
   *
   * on Small devices Tablets
   *
   * adds class `visible-sm-block`
   */
  visibleSmBlock: React.PropTypes.bool,
  /**
   * Apply clearfix
   *
   * on Medium devices Desktops
   *
   * adds class `visible-md-block`
   */
  visibleMdBlock: React.PropTypes.bool,
  /**
   * Apply clearfix
   *
   * on Large devices Desktops
   *
   * adds class `visible-lg-block`
   */
  visibleLgBlock: React.PropTypes.bool,
};

const defaultProps = {
  componentClass: 'div',
};

class Clearfix extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;

    const classes = getClassSet(props);

    DEVICE_SIZES.forEach(size => {
      const propName = `visible${capitalize(size)}Block`;
      if (props[propName]) {
        classes[`visible-${size}-block`] = true;
      }

      delete props[propName];
    });

    return (
      <Component
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

Clearfix.propTypes = propTypes;
Clearfix.defaultProps = defaultProps;

export default bsClass('clearfix', Clearfix);
