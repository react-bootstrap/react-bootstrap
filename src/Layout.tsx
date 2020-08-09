import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import { AsProp, BsPrefixRefForwardingComponent } from './helpers';

const camelCaseToHyphen = (str) =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const flexAlign = ['start', 'end', 'center', 'baseline', 'stretch'];

const display = [
  'none',
  'inline',
  'inline-block',
  'block',
  'table',
  'table-cell',
  'table-row',
  'flex',
  'inline-flex',
];

const flexDirection = ['row', 'row-reverse', 'column', 'column-reverse'];

const flexWrap = ['nowrap', 'wrap', 'wrap-reverse'];

const justifyContent = ['start', 'end', 'center', 'between', 'around'];

const spaceUtilSizePropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.oneOf(['auto']),
]);

const spaceUtilPropTypes = PropTypes.oneOfType([
  spaceUtilSizePropTypes,
  PropTypes.shape({
    /**
     *
     * the key is the side of spacing utility,
     * t - for classes that set margin-top or padding-top
     * b - for classes that set margin-bottom or padding-bottom
     * l - for classes that set margin-left or padding-left
     * r - for classes that set margin-right or padding-right
     * x - for classes that set both *-left and *-right
     * y - for classes that set both *-top and *-bottom
     * all - for classes that set a margin or padding on all 4 sides of the element
     * (because we cannot set "" as key, use "all" to represent blank side here)
     * see the boostrap doc
     * https://getbootstrap.com/docs/4.0/utilities/spacing/#how-it-works
     *
     */
    t: spaceUtilSizePropTypes,
    b: spaceUtilSizePropTypes,
    l: spaceUtilSizePropTypes,
    r: spaceUtilSizePropTypes,
    x: spaceUtilSizePropTypes,
    y: spaceUtilSizePropTypes,
    all: spaceUtilSizePropTypes,
  }),
]);

const breakpointPropTypes = PropTypes.shape({
  /**
   *
   * display utility,
   * see the boostrap doc
   * https://getbootstrap.com/docs/4.0/utilities/display/
   *
   */

  display: PropTypes.oneOf(display),

  /**
   *
   * flex utilities,
   * see the boostrap doc
   * https://getbootstrap.com/docs/4.0/utilities/flex/
   *
   */

  alignContent: PropTypes.oneOf(flexAlign),
  alignItem: PropTypes.oneOf(flexAlign),
  alignSelf: PropTypes.oneOf(flexAlign),
  flexDirection: PropTypes.oneOf(flexDirection),
  flexWrap: PropTypes.oneOf(flexWrap),
  justifyContent: PropTypes.oneOf(justifyContent),
  order: PropTypes.number,

  /**
   *
   * spacing utilities,
   * see the boostrap doc
   * https://getbootstrap.com/docs/4.0/utilities/spacing/
   * can be number , "auto", or object,
   * if passing number or "auto" it will set spacing on all 4 sides of the element
   *
   */

  m: spaceUtilPropTypes,
  p: spaceUtilPropTypes,
});

const propTypes = {
  /**
   *
   * for Extra small devices Phones (<576px)
   *
   */
  xs: breakpointPropTypes,

  /**
   *
   * for Small devices Tablets (≥576px)
   *
   */
  sm: breakpointPropTypes,

  /**
   *
   * for Medium devices Desktops (≥768px)
   *
   */
  md: breakpointPropTypes,

  /**
   *
   * for Large devices Desktops (≥992px)
   *
   */
  lg: breakpointPropTypes,

  /**
   *
   * for Large devices Desktops (≥1200px)
   *
   */
  xl: breakpointPropTypes,

  /**
   *
   * custom class name
   *
   */
  className: PropTypes.string,

  /**
   *
   * add `d-print-{display}` className on the element
   *
   */
  print: PropTypes.oneOf(display),
  /**
   *
   * add 'visible' or 'invisible' className on the element
   *
   */
  visible: PropTypes.bool,
  as: elementType,
};

const defaultProps = {
  className: '',
  componentClass: 'div',
};

const buildVisibleClassName = (visible) => {
  if (typeof visible !== 'boolean') {
    return '';
  }
  return visible ? 'visible' : 'invisible';
};

const buildPrintClassName = (print) => {
  if (!print) {
    return '';
  }
  return `d-print-${print}`;
};

const buildSpacingClassName = ({ propName, bpAbbrev, value }) => {
  if (typeof value === 'number' || value === 'auto') {
    const size = value;
    return `${propName}-${bpAbbrev}${size}`;
  }
  if (typeof value === 'object') {
    const classNameList = Object.keys(value).map((side) => {
      const size = value[side];
      const prefix = side === 'all' ? propName : `${propName}${side}`;
      return `${prefix}-${bpAbbrev}${size}`;
    });
    return classNames(classNameList);
  }
  return '';
};

const buildBreakpointClassName = (breakpoint, breakpointProps) => {
  if (typeof breakpointProps !== 'object') {
    return '';
  }
  const bpAbbrev = breakpoint === 'xs' ? '' : `${breakpoint}-`;
  const classNameList = Object.keys(breakpointProps).map((propName) => {
    const value = breakpointProps[propName];
    if (propName === 'm' || propName === 'p') {
      return buildSpacingClassName({ propName, value, bpAbbrev });
    }
    const suffix = `-${bpAbbrev}${value}`;
    let prefix = '';
    if (propName === 'display') {
      prefix = 'd';
    } else if (propName === 'flexDirection' || propName === 'flexWrap') {
      prefix = 'flex';
    } else {
      prefix = camelCaseToHyphen(propName);
    }
    return `${prefix}${suffix}`;
  });
  return classNames(classNameList);
};

const buildLayoutClassName = (breakpoints) => {
  const classNameList = Object.keys(breakpoints).map((bp) =>
    buildBreakpointClassName(bp, breakpoints[bp]),
  );
  return classNames(classNameList);
};

type SpaceUtilSizeTypes = number | 'auto';

type SpaceUtilTypes =
  | SpaceUtilSizeTypes
  | {
      t?: SpaceUtilSizeTypes;
      b?: SpaceUtilSizeTypes;
      l?: SpaceUtilSizeTypes;
      r?: SpaceUtilSizeTypes;
      x?: SpaceUtilSizeTypes;
      y?: SpaceUtilSizeTypes;
      all?: SpaceUtilSizeTypes;
    };

type BreakpointTypes = {
  display?: typeof display[number];

  alignContent?: typeof flexAlign[number];
  alignItem?: typeof flexAlign[number];
  alignSelf?: typeof flexAlign[number];
  flexDirection?: typeof flexDirection[number];
  flexWrap?: typeof flexWrap[number];
  justifyContent?: typeof justifyContent[number];
  order?: number;
  m?: SpaceUtilTypes;
  p?: SpaceUtilTypes;
};

export interface LayoutProps extends AsProp {
  xs?: BreakpointTypes;
  sm?: BreakpointTypes;
  md?: BreakpointTypes;
  lg?: BreakpointTypes;
  xl?: BreakpointTypes;

  className?: string;
  print?: typeof display[number];
  visible?: boolean;
}

type Layout = BsPrefixRefForwardingComponent<'div', LayoutProps>;

const Layout: Layout = (React.forwardRef(
  (
    {
      className: customClassName,
      as: Component = 'div',
      print,
      visible,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: LayoutProps,
    ref,
  ) => {
    const className = classNames(
      buildVisibleClassName(visible),
      buildPrintClassName(print),
      buildLayoutClassName({ xs, sm, md, lg, xl }),
      customClassName,
    );
    return <Component className={className} ref={ref} {...props} />;
  },
) as unknown) as Layout;

Layout.displayName = 'Layout';
Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
