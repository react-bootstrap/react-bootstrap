import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
const rowColWidth = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const rowColumns = PropTypes.oneOfType([
  rowColWidth,
  PropTypes.shape({
    size: rowColWidth,
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
   * The number of columns that will fit next to each other on extra small devices (<576px)
   *
   * @type {(number)}
   */
  xs: rowColumns,

  /**
   * The number of columns that will fit next to each other on small devices (≥576px)
   *
   * @type {(number)}
   */
  sm: rowColumns,

  /**
   * The number of columns that will fit next to each other on medium devices (≥768px)
   *
   * @type {(number)}
   */
  md: rowColumns,

  /**
   * The number of columns that will fit next to each other on large devices (≥992px)
   *
   * @type {(number)}
   */
  lg: rowColumns,

  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px)
   *
   * @type {(number)}
   */
  xl: rowColumns,
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
    const cols = [];
    const classes = [];

    DEVICE_SIZES.forEach(brkPoint => {
      let propValue = props[brkPoint];
      delete props[brkPoint];

      let col;
      if (propValue != null && typeof propValue === 'object') {
        ({ col = true } = propValue);
      } else {
        col = propValue;
      }

      let infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (col != null)
        cols.push(
          col === true
            ? `${sizePrefix}${infix}`
            : `${sizePrefix}${infix}-${col}`,
        );
    });

    if (!cols.length) {
      cols.push(decoratedBsPrefix); // plain 'row'
    }

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          decoratedBsPrefix,
          noGutters && 'no-gutters',
          ...cols,
          ...classes,
        )}
      />
    );
  },
);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
