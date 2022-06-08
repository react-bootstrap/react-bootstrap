import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as React from 'react';

import {
  useBootstrapPrefix,
  useBootstrapBreakpoints,
  useBootstrapMinBreakpoint,
} from './ThemeProvider';
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
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
  xxl?: RowColumns;
  [key: string]: any;
}

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

const Row: BsPrefixRefForwardingComponent<'div', RowProps> = React.forwardRef<
  HTMLDivElement,
  RowProps
>(
  (
    {
      bsPrefix,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    }: RowProps,
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
    const breakpoints = useBootstrapBreakpoints();
    const minBreakpoint = useBootstrapMinBreakpoint();

    const sizePrefix = `${decoratedBsPrefix}-cols`;
    const classes: string[] = [];

    breakpoints.forEach((brkPoint) => {
      const propValue = props[brkPoint];
      delete props[brkPoint];

      let cols;
      if (propValue != null && typeof propValue === 'object') {
        ({ cols } = propValue);
      } else {
        cols = propValue;
      }

      const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';

      if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
    });

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, decoratedBsPrefix, ...classes)}
      />
    );
  },
);

Row.displayName = 'Row';
Row.propTypes = propTypes;

export default Row;
