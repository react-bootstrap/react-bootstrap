import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import useCol from './useCol';

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

export interface ColProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
  xxl?: ColSpec;
  [key: string]: any;
}

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
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xs: column,

  /**
   * The number of columns to span on small devices (≥576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  sm: column,

  /**
   * The number of columns to span on medium devices (≥768px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  md: column,

  /**
   * The number of columns to span on large devices (≥992px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  lg: column,

  /**
   * The number of columns to span on extra large devices (≥1200px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xl: column,

  /**
   * The number of columns to span on extra extra large devices (≥1400px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xxl: column,
};

const Col: BsPrefixRefForwardingComponent<'div', ColProps> = React.forwardRef<
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
        className={classNames(className, !spans.length && bsPrefix)}
      />
    );
  },
) as typeof Col;

Col.displayName = 'Col';
Col.propTypes = propTypes;

export default Col;
