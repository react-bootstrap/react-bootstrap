import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

type RowColWidth =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'auto';
type RowColumns = RowColWidth | { cols?: RowColWidth };

export interface RowProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  noGutters?: boolean;
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
  xxl?: RowColumns;
}

const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;
const rowColWidth = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const rowColumns = PropTypes.oneOfType([
  rowColWidth,
  PropTypes.shape({
    cols: rowColWidth,
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
   * The number of columns that will fit next to each other on extra small devices (<576px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  xs: rowColumns,

  /**
   * The number of columns that will fit next to each other on small devices (≥576px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  sm: rowColumns,

  /**
   * The number of columns that will fit next to each other on medium devices (≥768px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  md: rowColumns,

  /**
   * The number of columns that will fit next to each other on large devices (≥992px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  lg: rowColumns,

  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  xl: rowColumns,

  /**
   * The number of columns that will fit next to each other on extra extra large devices (≥1400px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  xxl: rowColumns,
};

const defaultProps = {
  noGutters: false,
};

const Row: BsPrefixRefForwardingComponent<'div', RowProps> = React.forwardRef<
  HTMLDivElement,
  RowProps
>(
  (
    {
      bsPrefix,
      className,
      noGutters,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    }: RowProps,
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
    const sizePrefix = `${decoratedBsPrefix}-cols`;
    const classes: string[] = [];

    DEVICE_SIZES.forEach((brkPoint) => {
      const propValue = props[brkPoint];
      delete props[brkPoint];

      let cols;
      if (propValue != null && typeof propValue === 'object') {
        ({ cols } = propValue);
      } else {
        cols = propValue;
      }

      const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
    });

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          decoratedBsPrefix,
          noGutters && 'no-gutters',
          ...classes,
        )}
      />
    );
  },
);

Row.displayName = 'Row';
Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
