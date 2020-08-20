import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import { AsProp, BsPrefixRefForwardingComponent } from './helpers';

const camelCaseToHyphen = (str: string) =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const hyphenToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

const displayValues = [
  'none',
  'inline',
  'inline-block',
  'block',
  'table',
  'table-cell',
  'table-row',
  'flex',
  'inline-flex',
] as const;
type Display = typeof displayValues[number];

const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

const flexAlignValues = [
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
] as const;

const justifyContentValues = [
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
] as const;

const breakpointValues = [true, 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
type Breakpoint = typeof breakpointValues[number];

const borderValues = [true, 'top', 'right', 'bottom', 'left'] as const;
type Border = typeof borderValues[number];

const colorValues = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  'white',
] as const;
type Color = typeof colorValues[number];

const radiusValues = [true, 'circle', 'pill', '0', 'sm', 'lg'] as const;
type Radius = typeof radiusValues[number];

const userSelectValues = ['all', 'auto', 'none'] as const;
type UserSelect = typeof userSelectValues[number];

const peValues = ['none', 'auto'] as const;
type Pe = typeof peValues[number];

const generateBreakpoint = (
  bsPrefix: string,
  currentBreakpoint: string | true,
  bsSuffix: string,
) => {
  const breakpointPrefix =
    currentBreakpoint === true ? '' : `-${currentBreakpoint}`;
  return `${bsPrefix}${breakpointPrefix}-${camelCaseToHyphen(bsSuffix)}`;
};

const createUtility = (utilityPrefix, suffixes, genCallback) => {
  return suffixes.reduce((builtObject, currentSuffix) => {
    builtObject[
      hyphenToCamelCase(`${utilityPrefix}-${currentSuffix}`)
    ] = genCallback(currentSuffix);
    return builtObject;
  }, {});
};

const utilities: Record<string, (utilityValue: any) => string> = {
  visible(visible: boolean) {
    return visible ? 'visible' : 'invisible';
  },
  print(print) {
    return `d-print-${print}`;
  },
  ...createUtility('display', displayValues, (suffix) => (breakpoint) =>
    generateBreakpoint('d', breakpoint, suffix),
  ),
  ...createUtility(
    'flex-direction',
    flexDirectionValues,
    (suffix) => (breakpoint) => generateBreakpoint('flex', breakpoint, suffix),
  ),
  ...createUtility('align-items', flexAlignValues, (suffix) => (breakpoint) =>
    generateBreakpoint('align-items', breakpoint, suffix),
  ),
  ...createUtility('align-self', flexAlignValues, (suffix) => (breakpoint) =>
    generateBreakpoint('align-self', breakpoint, suffix),
  ),
  ...createUtility(
    'justify-content',
    justifyContentValues,
    (suffix) => (breakpoint) =>
      generateBreakpoint('justify-content', breakpoint, suffix),
  ),
  flexFill(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'fill');
  },
  flexWrap(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'wrap');
  },
  flexNoWrap(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'no-wrap');
  },
  flexWrapReverse(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'wrap-reverse');
  },
  flexShrinkZero(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'shrink-0');
  },
  flexShrinkOne(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'shrink-1');
  },
  flexGrowZero(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'grow-0');
  },
  flexGrowOne(breakpoint: Breakpoint) {
    return generateBreakpoint('flex', breakpoint, 'grow-1');
  },
  orderZero(breakpoint: Breakpoint) {
    return generateBreakpoint('order', breakpoint, '0');
  },
  orderOne(breakpoint: Breakpoint) {
    return generateBreakpoint('order', breakpoint, '1');
  },
  orderTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('order', breakpoint, '2');
  },
  orderThree(breakpoint: Breakpoint) {
    return generateBreakpoint('order', breakpoint, '3');
  },
  orderFour(breakpoint: Breakpoint) {
    return generateBreakpoint('order', breakpoint, '4');
  },
  orderFive(breakpoint: Breakpoint) {
    return generateBreakpoint('order', breakpoint, '5');
  },
  border(border: Border | true) {
    let suffix = `-${border}`;
    if (border === true) {
      suffix = '';
    }
    return `border${suffix}`;
  },
  borderZero(border: Border | true) {
    let suffix = `-${border}`;
    if (border === true) {
      suffix = '';
    }
    return `border${suffix}-0`;
  },
  borderColor(color: Color) {
    return `border-${color}`;
  },
  borderRadius(radius: Radius) {
    return `rounded-${radius}`;
  },
  color(color: Color) {
    return `text-${color}`;
  },
  bgColor(color: Color) {
    return `bg-${color}`;
  },
  bgColorGradient(color: Color) {
    return `bg-${color} bg-gradient`;
  },
  floatLeft(breakpoint: Breakpoint) {
    let suffix = `-${breakpoint}`;
    if (breakpoint === true) {
      suffix = '';
    }
    return `float${suffix}-left`;
  },
  floatRight(breakpoint: Breakpoint) {
    let suffix = `-${breakpoint}`;
    if (breakpoint === true) {
      suffix = '';
    }
    return `float${suffix}-right`;
  },
  floatNone(breakpoint: Breakpoint) {
    let suffix = `-${breakpoint}`;
    if (breakpoint === true) {
      suffix = '';
    }
    return `float${suffix}-none`;
  },
  userSelect(option: UserSelect) {
    return `user-select-${option}`;
  },
  pe(option: Pe) {
    return `pe-${option}`;
  },
};

const propTypes = {
  as: elementType,

  /**
   *
   * set a custom class name.
   *
   */
  className: PropTypes.string,

  displayNone: PropTypes.oneOf(breakpointValues),
  displayInline: PropTypes.oneOf(breakpointValues),
  displayInlineBlock: PropTypes.oneOf(breakpointValues),
  displayBlock: PropTypes.oneOf(breakpointValues),
  displayTable: PropTypes.oneOf(breakpointValues),
  displayTableCell: PropTypes.oneOf(breakpointValues),
  displayTableRow: PropTypes.oneOf(breakpointValues),
  displayFlex: PropTypes.oneOf(breakpointValues),
  displayInlineFlex: PropTypes.oneOf(breakpointValues),

  flexDirectionRow: PropTypes.oneOf(breakpointValues),
  flexDirectionRowReverse: PropTypes.oneOf(breakpointValues),
  flexDirectionColumn: PropTypes.oneOf(breakpointValues),
  flexDirectionColumnReverse: PropTypes.oneOf(breakpointValues),

  alignItemsStart: PropTypes.oneOf(breakpointValues),
  alignItemsEnd: PropTypes.oneOf(breakpointValues),
  alignItemsCenter: PropTypes.oneOf(breakpointValues),
  alignItemsBaseline: PropTypes.oneOf(breakpointValues),
  alignItemsStretch: PropTypes.oneOf(breakpointValues),

  alignSelfStart: PropTypes.oneOf(breakpointValues),
  alignSelfEnd: PropTypes.oneOf(breakpointValues),
  alignSelfCenter: PropTypes.oneOf(breakpointValues),
  alignSelfBaseline: PropTypes.oneOf(breakpointValues),
  alignSelfStretch: PropTypes.oneOf(breakpointValues),

  justifyContentStart: PropTypes.oneOf(breakpointValues),
  justifyContentEnd: PropTypes.oneOf(breakpointValues),
  justifyContentCenter: PropTypes.oneOf(breakpointValues),
  justifyContentBetween: PropTypes.oneOf(breakpointValues),
  justifyContentAround: PropTypes.oneOf(breakpointValues),
  justifyContentEvenly: PropTypes.oneOf(breakpointValues),

  flexFill: PropTypes.oneOf(breakpointValues),
  flexWrap: PropTypes.oneOf(breakpointValues),
  flexNoWrap: PropTypes.oneOf(breakpointValues),
  flexWrapReverse: PropTypes.oneOf(breakpointValues),

  flexShrinkZero: PropTypes.oneOf(breakpointValues),
  flexShrinkOne: PropTypes.oneOf(breakpointValues),
  flexGrowZero: PropTypes.oneOf(breakpointValues),
  flexGrowOne: PropTypes.oneOf(breakpointValues),

  orderZero: PropTypes.oneOf(breakpointValues),
  orderOne: PropTypes.oneOf(breakpointValues),
  orderTwo: PropTypes.oneOf(breakpointValues),
  orderThree: PropTypes.oneOf(breakpointValues),
  orderFour: PropTypes.oneOf(breakpointValues),
  orderFive: PropTypes.oneOf(breakpointValues),

  border: PropTypes.oneOf(borderValues),
  borderZero: PropTypes.oneOf(borderValues),
  borderColor: PropTypes.oneOf(colorValues),
  borderRadius: PropTypes.oneOf(radiusValues),

  color: PropTypes.oneOf(colorValues),
  bgColor: PropTypes.oneOf(colorValues),
  bgColorGradient: PropTypes.oneOf(colorValues),

  floatLeft: PropTypes.oneOf(breakpointValues),
  floatRight: PropTypes.oneOf(breakpointValues),
  floatNone: PropTypes.oneOf(breakpointValues),

  userSelect: PropTypes.oneOf(userSelectValues),
  pe: PropTypes.oneOf(peValues),

  /**
   *
   * add `d-print-{display}` className on the element
   *
   */
  print: PropTypes.oneOf(displayValues),

  /**
   *
   * add 'visible' or 'invisible' className on the element
   *
   */
  visible: PropTypes.bool,
};

const defaultProps = {
  className: '',
};

export type BoxProps = AsProp &
  Partial<{
    displayNone: Breakpoint;
    displayInline: Breakpoint;
    displayInlineBlock: Breakpoint;
    displayBlock: Breakpoint;
    displayTable: Breakpoint;
    displayTableCell: Breakpoint;
    displayTableRow: Breakpoint;
    displayFlex: Breakpoint;
    displayInlineFlex: Breakpoint;

    flexDirectionRow: Breakpoint;
    flexDirectionRowReverse: Breakpoint;
    flexDirectionColumn: Breakpoint;
    flexDirectionColumnReverse: Breakpoint;

    alignItemsStart: Breakpoint;
    alignItemsEnd: Breakpoint;
    alignItemsCenter: Breakpoint;
    alignItemsBaseline: Breakpoint;
    alignItemsStretch: Breakpoint;

    alignSelfStart: Breakpoint;
    alignSelfEnd: Breakpoint;
    alignSelfCenter: Breakpoint;
    alignSelfBaseline: Breakpoint;
    alignSelfStretch: Breakpoint;

    justifyContentStart: Breakpoint;
    justifyContentEnd: Breakpoint;
    justifyContentCenter: Breakpoint;
    justifyContentBetween: Breakpoint;
    justifyContentAround: Breakpoint;
    justifyContentEvenly: Breakpoint;

    flexFill: Breakpoint;
    flexWrap: Breakpoint;
    flexNoWrap: Breakpoint;
    flexWrapReverse: Breakpoint;

    flexShrinkZero: Breakpoint;
    flexShrinkOne: Breakpoint;
    flexGrowZero: Breakpoint;
    flexGrowOne: Breakpoint;

    orderZero: Breakpoint;
    orderOne: Breakpoint;
    orderTwo: Breakpoint;
    orderThree: Breakpoint;
    orderFour: Breakpoint;
    orderFive: Breakpoint;

    border: Border;
    borderZero: Border;
    borderColor: Color;
    borderRadius: Radius;

    color: Color;
    bgColor: Color;
    bgColorGradient: Color;

    floatLeft: Breakpoint;
    floatRight: Breakpoint;
    floatNone: Breakpoint;

    userSelect: UserSelect;
    pe: Pe;

    className: string;
    print: Display;
    visible: boolean;
  }>;

type Box = BsPrefixRefForwardingComponent<'div', BoxProps>;

const Box = (React.forwardRef(
  (
    {
      className,
      as: Component = 'div',
      displayNone,
      displayInline,
      displayInlineBlock,
      displayBlock,
      displayTable,
      displayTableCell,
      displayTableRow,
      displayFlex,
      displayInlineFlex,
      flexDirectionRow,
      flexDirectionRowReverse,
      flexDirectionColumn,
      flexDirectionColumnReverse,
      alignItemsStart,
      alignItemsEnd,
      alignItemsCenter,
      alignItemsBaseline,
      alignItemsStretch,
      alignSelfStart,
      alignSelfEnd,
      alignSelfCenter,
      alignSelfBaseline,
      alignSelfStretch,
      flexFill,
      flexWrap,
      flexNoWrap,
      flexWrapReverse,
      flexShrinkZero,
      flexShrinkOne,
      flexGrowZero,
      flexGrowOne,
      orderZero,
      orderOne,
      orderTwo,
      orderThree,
      orderFour,
      orderFive,
      justifyContentStart,
      justifyContentEnd,
      justifyContentCenter,
      justifyContentBetween,
      justifyContentAround,
      justifyContentEvenly,
      border,
      borderZero,
      borderColor,
      borderRadius,
      color,
      bgColor,
      bgColorGradient,
      floatLeft,
      floatRight,
      floatNone,
      userSelect,
      pe,
      print,
      visible,
      ...props
    }: BoxProps,
    ref,
  ) => {
    const utilityProps = {
      displayNone,
      displayInline,
      displayInlineBlock,
      displayBlock,
      displayTable,
      displayTableCell,
      displayTableRow,
      displayFlex,
      displayInlineFlex,
      print,
      visible,
      flexDirectionRow,
      flexDirectionRowReverse,
      flexDirectionColumn,
      flexDirectionColumnReverse,
      alignItemsStart,
      alignItemsEnd,
      alignItemsCenter,
      alignItemsBaseline,
      alignItemsStretch,
      alignSelfStart,
      alignSelfEnd,
      alignSelfCenter,
      alignSelfBaseline,
      alignSelfStretch,
      flexFill,
      flexWrap,
      flexNoWrap,
      flexWrapReverse,
      justifyContentStart,
      justifyContentEnd,
      justifyContentCenter,
      justifyContentBetween,
      justifyContentAround,
      justifyContentEvenly,
      flexShrinkZero,
      flexShrinkOne,
      flexGrowZero,
      flexGrowOne,
      orderZero,
      orderOne,
      orderTwo,
      orderThree,
      orderFour,
      orderFive,
      border,
      borderZero,
      borderColor,
      borderRadius,
      color,
      bgColor,
      bgColorGradient,
      floatLeft,
      floatRight,
      floatNone,
      userSelect,
      pe,
    };
    const finalClassName = classNames(
      ...Object.entries(utilityProps)
        .filter(([_, utilityValue]) => utilityValue !== undefined)
        .map(([utilityName, utilityValue]) =>
          utilities[utilityName](utilityValue),
        ),
      className,
    );
    return <Component ref={ref} className={finalClassName} {...props} />;
  },
) as unknown) as Box;

Box.displayName = 'Box';
Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
