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
   * @type {(number|{ cols: number })}
   */
  xs: rowColumns,

  /**
   * The number of columns that will fit next to each other on small devices (≥576px)
   *
   * @type {(number|{ cols: number })}
   */
  sm: rowColumns,

  /**
   * The number of columns that will fit next to each other on medium devices (≥768px)
   *
   * @type {(number|{ cols: number })}
   */
  md: rowColumns,

  /**
   * The number of columns that will fit next to each other on large devices (≥992px)
   *
   * @type {(number|{ cols: number })}
   */
  lg: rowColumns,

  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px)
   *
   * @type {(number|{ cols: number })}
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
    const rowCols = [];
    const classes = [];

    DEVICE_SIZES.forEach(brkPoint => {
      let propValue = props[brkPoint];
      delete props[brkPoint];

      let cols;
      if (propValue != null && typeof propValue === 'object') {
        ({ cols = true } = propValue);
      } else {
        cols = propValue;
      }

      let infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (cols != null)
        rowCols.push(
          cols === true
            ? `${sizePrefix}${infix}`
            : `${sizePrefix}${infix}-${cols}`,
        );
    });

    if (!rowCols.length) {
      rowCols.push(decoratedBsPrefix); // plain 'row'
    }

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          decoratedBsPrefix,
          noGutters && 'no-gutters',
          ...rowCols,
          ...classes,
        )}
      />
    );
  },
);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
