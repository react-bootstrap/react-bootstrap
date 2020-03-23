import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
const colSize = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(['auto']),
]);

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const column = PropTypes.oneOfType([
  colSize,
  PropTypes.shape({
    size: colSize,
    order: stringOrNumber,
    offset: stringOrNumber,
  }),
]);

const propTypes = {
  /**
   * @default 'col'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,

  /**
   * The number of columns to span on extra small devices (<576px)
   *
   * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
   */
  xs: column,

  /**
   * The number of columns to span on small devices (≥576px)
   *
   * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
   */
  sm: column,

  /**
   * The number of columns to span on medium devices (≥768px)
   *
   * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
   */
  md: column,

  /**
   * The number of columns to span on large devices (≥992px)
   *
   * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
   */
  lg: column,

  /**
   * The number of columns to span on extra large devices (≥1200px)
   *
   * @type {(true|"auto"|number|{ span: true|"auto"|number, offset: number, order: number })}
   */
  xl: column,
};

const Col = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ bsPrefix, className, as: Component = 'div', ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'col');
    const spans = [];
    const classes = [];

    DEVICE_SIZES.forEach((brkPoint) => {
      let propValue = props[brkPoint];
      delete props[brkPoint];

      let span, offset, order;
      if (propValue != null && typeof propValue === 'object') {
        ({ span = true, offset, order } = propValue);
      } else {
        span = propValue;
      }

      let infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (span != null)
        spans.push(
          span === true ? `${prefix}${infix}` : `${prefix}${infix}-${span}`,
        );

      if (order != null) classes.push(`order${infix}-${order}`);
      if (offset != null) classes.push(`offset${infix}-${offset}`);
    });

    if (!spans.length) {
      spans.push(prefix); // plain 'col'
    }

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, ...spans, ...classes)}
      />
    );
  },
);

Col.displayName = 'Col';
Col.propTypes = propTypes;

export default Col;
