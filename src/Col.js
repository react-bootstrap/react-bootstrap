import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';
import { DEVICE_SIZES } from './utils/StyleConfig';

const column = PropTypes.oneOfType([
  PropTypes.oneOf(['auto']),
  PropTypes.number
]);

const propTypes = {
  componentClass: elementType,

  /**
   * The number of columns you wish to span
   *
   * for Extra small devices Phones (<576px)
   *
   * class-prefix `col-`
   */
  xs: column,

  /**
   * The number of columns you wish to span
   *
   * for Small devices Tablets (≥576px)
   *
   * class-prefix `col-sm-`
   */
  sm: column,

  /**
   * The number of columns you wish to span
   *
   * for Medium devices Desktops (≥768px)
   *
   * class-prefix `col-md-`
   */
  md: column,

  /**
   * The number of columns you wish to span
   *
   * for Large devices Desktops (≥992px)
   *
   * class-prefix `col-lg-`
   */
  lg: column,

  /**
   * The number of columns you wish to span
   *
   * for Large devices Desktops (≥1200px)
   *
   * class-prefix `col-xl-`
   */
  xl: column
};

const defaultProps = {
  componentClass: 'div'
};

class Col extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = [];

    DEVICE_SIZES.forEach(size => {
      const propValue = elementProps[size];

      if (propValue == null) return;

      if (size === 'xs') {
        // col and col-4
        classes.push(
          propValue === true
            ? bsProps.bsClass
            : prefix(bsProps, `-${propValue}`)
        );
      } else {
        // col-md-3
        classes.push(prefix(bsProps, `${size}-${propValue}`));
      }

      delete elementProps[size];
    });

    if (!classes.length) {
      classes.push(bsProps.bsClass); // plain 'col'
    }

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default bsClass('col', Col);
