import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

const camelCaseToHyphen = (str) =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const flexAlignPropTypes = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
]);

const displayPropTypes = PropTypes.oneOf([
  'none',
  'inline',
  'inline-block',
  'block',
  'table',
  'table-cell',
  'table-row',
  'flex',
  'inline-flex',
]);

const flexDirectionPropTypes = PropTypes.oneOf([
  'row',
  'row-reverse',
  'column',
  'column-reverse',
]);

const flexWrapPropTypes = PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']);

const justifyContentPropTypes = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'between',
  'around',
]);

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

  display: displayPropTypes,

  /**
   *
   * flex utilities,
   * see the boostrap doc
   * https://getbootstrap.com/docs/4.0/utilities/flex/
   *
   */

  alignContent: flexAlignPropTypes,
  alignItem: flexAlignPropTypes,
  alignSelf: flexAlignPropTypes,
  flexDirection: flexDirectionPropTypes,
  flexWrap: flexWrapPropTypes,
  justifyContent: justifyContentPropTypes,
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

class Layout extends React.Component {
  /**
   *
   * Combination component of bootstrap V4 layout utility
   * (display / flex / spacing / visibility)
   * https://getbootstrap.com/docs/4.0/layout/utilities-for-layout/
   *
   */

  static propTypes = {
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
    print: displayPropTypes,
    /**
     *
     * add 'visible' or 'invisible' className on the element
     *
     */
    visible: PropTypes.bool,
    componentClass: elementType,
  };

  static defaultProps = {
    className: '',
    componentClass: 'div',
  };

  buildVisibleClassName = (visible) => {
    if (typeof visible !== 'boolean') {
      return '';
    }
    return visible ? 'visible' : 'invisible';
  };

  buildPrintClassName = (print) => {
    if (!print) {
      return '';
    }
    return `d-print-${print}`;
  };

  buildLayoutClassName = (breakpoints) => {
    const classNameList = Object.keys(breakpoints).map((bp) =>
      this.buildBreakpointClassName(bp, breakpoints[bp]),
    );
    return classNames(classNameList);
  };

  buildBreakpointClassName = (breakpoint, breakpointProps) => {
    if (typeof breakpointProps !== 'object') {
      return '';
    }
    const bpAbbrev = breakpoint === 'xs' ? '' : `${breakpoint}-`;
    const classNameList = Object.keys(breakpointProps).map((propName) => {
      const value = breakpointProps[propName];
      if (propName === 'm' || propName === 'p') {
        return this.buildSpacingClassName({ propName, value, bpAbbrev });
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

  buildSpacingClassName = ({ propName, bpAbbrev, value }) => {
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

  render() {
    const {
      className: customClassName,
      componentClass,
      print,
      visible,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    } = this.props;
    const className = classNames(
      this.buildVisibleClassName(visible),
      this.buildPrintClassName(print),
      this.buildLayoutClassName({ xs, sm, md, lg, xl }),
      customClassName,
    );
    const Component = componentClass;
    return <Component className={className} {...props} />;
  }
}

export default Layout;
