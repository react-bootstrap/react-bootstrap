import clsx from 'clsx';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import useCol from './useCol.js';

export type NumberAttr =
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
  | '12';

export type ColOrderNumber = number | '1' | '2' | '3' | '4' | '5';
export type ColOrder = ColOrderNumber | 'first' | 'last';
export type ColSize = boolean | 'auto' | NumberAttr;
export type ColSpec =
  | ColSize
  | { span?: ColSize | null; offset?: NumberAttr; order?: ColOrder };

export interface ColProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'col'
   */
  bsPrefix?: string | undefined;

  /**
   * The number of columns to span on extra small devices (<576px).
   */
  xs?: ColSpec | undefined;

  /**
   * The number of columns to span on small devices (≥576px).
   */
  sm?: ColSpec | undefined;

  /**
   * The number of columns to span on medium devices (≥768px).
   */
  md?: ColSpec | undefined;

  /**
   * The number of columns to span on large devices (≥992px).
   */
  lg?: ColSpec | undefined;

  /**
   * The number of columns to span on extra large devices (≥1200px).
   */
  xl?: ColSpec | undefined;

  /**
   * The number of columns to span on extra extra large devices (≥1400px).
   */
  xxl?: ColSpec | undefined;
  [key: string]: any;
}

const Col: DynamicRefForwardingComponent<'div', ColProps> = React.forwardRef<
  HTMLElement,
  ColProps
>(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (props, ref) => {
    const [
      { className, ...colProps },
      { as: Component = 'div', bsPrefix, spans },
    ] = useCol(props);

    return (
      <Component
        {...colProps}
        ref={ref}
        className={clsx(className, !spans.length && bsPrefix)}
      />
    );
  },
);

Col.displayName = 'Col';

export default Col;
