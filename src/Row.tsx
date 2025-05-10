import classNames from 'classnames';
import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import {
  useBootstrapPrefix,
  useBootstrapBreakpoints,
  useBootstrapMinBreakpoint,
} from './ThemeProvider';

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

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'row'
   */
  bsPrefix?: string | undefined;

  /**
   * The number of columns that will fit next to each other on extra small devices (<576px).
   * Use `auto` to give columns their natural widths.
   */
  xs?: RowColumns | undefined;

  /**
   * The number of columns that will fit next to each other on small devices (≥576px).
   * Use `auto` to give columns their natural widths.
   */
  sm?: RowColumns | undefined;

  /**
   * The number of columns that will fit next to each other on medium devices (≥768px).
   * Use `auto` to give columns their natural widths.
   */
  md?: RowColumns | undefined;

  /**
   * The number of columns that will fit next to each other on large devices (≥992px).
   * Use `auto` to give columns their natural widths.
   */
  lg?: RowColumns | undefined;

  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px).
   * Use `auto` to give columns their natural widths.
   */
  xl?: RowColumns | undefined;

  /**
   * The number of columns that will fit next to each other on extra extra large devices (≥1400px).
   * Use `auto` to give columns their natural widths.
   */
  xxl?: RowColumns | undefined;

  [key: string]: any;
}

const Row: DynamicRefForwardingComponent<'div', RowProps> = React.forwardRef<
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

export default Row;
