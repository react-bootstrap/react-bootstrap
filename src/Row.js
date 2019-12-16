import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
const colSize = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const column = PropTypes.oneOfType([
  colSize,
  PropTypes.shape({
    size: colSize,
  }),
]);

const propTypes = {
  /**
   * @default 'row'
   */
  bsPrefix: PropTypes.string,

  /** Removes the gutter spacing between `Col`s as well as any added negative margins. */
  noGutters: PropTypes.bool.isRequired,
  as: PropTypes.elementType,

  /**
   * The number of columns each column will span on extra small devices (<576px)
   *
   * @type {(number)}
   */
  xs: column,

  /**
   * The number of columns each column will span on small devices (≥576px)
   *
   * @type {(number)}
   */
  sm: column,

  /**
   * The number of columns each column will span on medium devices (≥768px)
   *
   * @type {(number)}
   */
  md: column,

  /**
   * The number of columns each column will span on large devices (≥992px)
   *
   * @type {(number)}
   */
  lg: column,

  /**
   * The number of columns each column will span on extra large devices (≥1200px)
   *
   * @type {(number)}
   */
  xl: column,
};

const defaultProps = {
  noGutters: false,
};

const Row = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    { bsPrefix, className, noGutters, as: Component = 'div', ...props },
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
    const sizePrefix = useBootstrapPrefix(
      `${decoratedBsPrefix}-cols`,
      'row-cols',
    );
    const spans = [];
    const classes = [];

    DEVICE_SIZES.forEach(brkPoint => {
      let propValue = props[brkPoint];
      delete props[brkPoint];

      let span;
      if (propValue != null && typeof propValue === 'object') {
        ({ span = true } = propValue);
      } else {
        span = propValue;
      }

      let infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (span != null)
        spans.push(
          span === true
            ? `${sizePrefix}${infix}`
            : `${sizePrefix}${infix}-${span}`,
        );
    });

    if (!spans.length) {
      spans.push(decoratedBsPrefix); // plain 'row'
    }

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          decoratedBsPrefix,
          noGutters && 'no-gutters',
          ...spans,
          ...classes,
        )}
      />
    );
  },
);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
