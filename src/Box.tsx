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

const overflowValues = ['auto', 'hidden'] as const;
type Overflow = typeof overflowValues[number];

const positionValues = [
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',
] as const;
type Position = typeof positionValues[number];

const shadowValues = ['none', 'sm', true, 'lg'] as const;
type Shadow = typeof shadowValues[number];

const alignmentValues = ['baseline', 'top', 'middle', 'bottom'] as const;
type Alignment = typeof alignmentValues[number];

const sizingValues = ['25', '50', '75', '100', 'auto'] as const;
type Sizing = typeof sizingValues[number];

const textTransformValues = ['lowercase', 'uppercase', 'capitalize'] as const;
type TextTransform = typeof textTransformValues[number];

const fontWeightValues = [
  'bold',
  'bolder',
  'normal',
  'light',
  'lighter',
] as const;
type FontWeight = typeof fontWeightValues[number];

const fontStyleValues = ['italic', 'normal'] as const;
type FontStyle = typeof fontStyleValues[number];

const lineHeightValues = ['1', 'sm', 'base', 'lg'] as const;
type LineHeight = typeof lineHeightValues[number];

const textDecorationValues = ['underline', 'line-through', 'none'] as const;
type TextDecoration = typeof textDecorationValues[number];

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
  overflow(option: Overflow) {
    return `overflow-${option}`;
  },
  position(position: Position) {
    return `position-${position}`;
  },
  shadow(shadow: Shadow) {
    let suffix = `-${shadow}`;
    if (shadow === true) {
      suffix = '';
    }
    return `shadow${suffix}`;
  },
  align(align: Alignment) {
    return `align-${align}`;
  },
  alignText(align: Alignment) {
    return `align-text-${align}`;
  },
  width(size: Sizing) {
    return `w-${size}`;
  },
  height(size: Sizing) {
    return `h-${size}`;
  },
  maxWidth() {
    return `mw-100`;
  },
  maxHeight() {
    return `mh-100`;
  },
  viewportWidth() {
    return `vw-100`;
  },
  viewportHeight() {
    return `vh-100`;
  },
  minViewportWidth() {
    return `min-vw-100`;
  },
  minViewportHeight() {
    return `min-vh-100`;
  },
  textLeft(breakpoint: Breakpoint) {
    return generateBreakpoint('text', breakpoint, 'left');
  },
  textCenter(breakpoint: Breakpoint) {
    return generateBreakpoint('text', breakpoint, 'center');
  },
  textRight(breakpoint: Breakpoint) {
    return generateBreakpoint('text', breakpoint, 'right');
  },
  textWrap() {
    return `text-wrap`;
  },
  textNoWrap() {
    return `text-nowrap`;
  },
  textBreak() {
    return `text-break`;
  },
  textTransform(transform: TextTransform) {
    return `text-${transform}`;
  },
  fontWeight(weight: FontWeight) {
    return `font-weight-${weight}`;
  },
  fontStyle(style: FontStyle) {
    return `font-${style}`;
  },
  lineHeight(height: LineHeight) {
    return `lh-${height}`;
  },
  fontMonospace() {
    return `font-monospace`;
  },
  textReset() {
    return `text-reset`;
  },
  textDecoration(decoration: TextDecoration) {
    return `text-decoration-${decoration}`;
  },
  marginZero(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, '0');
  },
  marginOne(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, '1');
  },
  marginTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, '2');
  },
  marginThree(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, '3');
  },
  marginFour(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, '4');
  },
  marginFive(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, '5');
  },
  marginAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('m', breakpoint, 'auto');
  },
  marginTopZero(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, '0');
  },
  marginTopOne(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, '1');
  },
  marginTopTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, '2');
  },
  marginTopThree(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, '3');
  },
  marginTopFour(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, '4');
  },
  marginTopFive(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, '5');
  },
  marginTopAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('mt', breakpoint, 'auto');
  },
  marginBottomZero(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, '0');
  },
  marginBottomOne(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, '1');
  },
  marginBottomTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, '2');
  },
  marginBottomThree(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, '3');
  },
  marginBottomFour(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, '4');
  },
  marginBottomFive(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, '5');
  },
  marginBottomAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('mb', breakpoint, 'auto');
  },
  marginLeftZero(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, '0');
  },
  marginLeftOne(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, '1');
  },
  marginLeftTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, '2');
  },
  marginLeftThree(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, '3');
  },
  marginLeftFour(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, '4');
  },
  marginLeftFive(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, '5');
  },
  marginLeftAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('ml', breakpoint, 'auto');
  },
  marginRightZero(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, '0');
  },
  marginRightOne(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, '1');
  },
  marginRightTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, '2');
  },
  marginRightThree(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, '3');
  },
  marginRightFour(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, '4');
  },
  marginRightFive(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, '5');
  },
  marginRightAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('mr', breakpoint, 'auto');
  },
  marginXZero(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, '0');
  },
  marginXOne(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, '1');
  },
  marginXTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, '2');
  },
  marginXThree(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, '3');
  },
  marginXFour(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, '4');
  },
  marginXFive(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, '5');
  },
  marginXAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('mx', breakpoint, 'auto');
  },
  marginYZero(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, '0');
  },
  marginYOne(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, '1');
  },
  marginYTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, '2');
  },
  marginYThree(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, '3');
  },
  marginYFour(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, '4');
  },
  marginYFive(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, '5');
  },
  marginYAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('my', breakpoint, 'auto');
  },
  paddingZero(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, '0');
  },
  paddingOne(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, '1');
  },
  paddingTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, '2');
  },
  paddingThree(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, '3');
  },
  paddingFour(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, '4');
  },
  paddingFive(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, '5');
  },
  paddingAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('p', breakpoint, 'auto');
  },
  paddingTopZero(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, '0');
  },
  paddingTopOne(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, '1');
  },
  paddingTopTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, '2');
  },
  paddingTopThree(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, '3');
  },
  paddingTopFour(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, '4');
  },
  paddingTopFive(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, '5');
  },
  paddingTopAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('pt', breakpoint, 'auto');
  },
  paddingBottomZero(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, '0');
  },
  paddingBottomOne(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, '1');
  },
  paddingBottomTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, '2');
  },
  paddingBottomThree(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, '3');
  },
  paddingBottomFour(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, '4');
  },
  paddingBottomFive(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, '5');
  },
  paddingBottomAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('pb', breakpoint, 'auto');
  },
  paddingLeftZero(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, '0');
  },
  paddingLeftOne(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, '1');
  },
  paddingLeftTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, '2');
  },
  paddingLeftThree(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, '3');
  },
  paddingLeftFour(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, '4');
  },
  paddingLeftFive(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, '5');
  },
  paddingLeftAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('pl', breakpoint, 'auto');
  },
  paddingRightZero(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, '0');
  },
  paddingRightOne(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, '1');
  },
  paddingRightTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, '2');
  },
  paddingRightThree(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, '3');
  },
  paddingRightFour(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, '4');
  },
  paddingRightFive(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, '5');
  },
  paddingRightAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('pr', breakpoint, 'auto');
  },
  paddingXZero(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, '0');
  },
  paddingXOne(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, '1');
  },
  paddingXTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, '2');
  },
  paddingXThree(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, '3');
  },
  paddingXFour(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, '4');
  },
  paddingXFive(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, '5');
  },
  paddingXAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('px', breakpoint, 'auto');
  },
  paddingYZero(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, '0');
  },
  paddingYOne(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, '1');
  },
  paddingYTwo(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, '2');
  },
  paddingYThree(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, '3');
  },
  paddingYFour(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, '4');
  },
  paddingYFive(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, '5');
  },
  paddingYAuto(breakpoint: Breakpoint) {
    return generateBreakpoint('py', breakpoint, 'auto');
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

  overflow: PropTypes.oneOf(overflowValues),

  position: PropTypes.oneOf(positionValues),

  shadow: PropTypes.oneOf(shadowValues),

  align: PropTypes.oneOf(alignmentValues),
  alignText: PropTypes.oneOf(alignmentValues),

  width: PropTypes.oneOf(sizingValues),
  height: PropTypes.oneOf(sizingValues),
  maxWidth: PropTypes.bool,
  maxHeight: PropTypes.bool,
  viewportWidth: PropTypes.bool,
  viewportHeight: PropTypes.bool,
  minViewportWidth: PropTypes.bool,
  minViewportHeight: PropTypes.bool,

  textLeft: PropTypes.oneOf(breakpointValues),
  textCenter: PropTypes.oneOf(breakpointValues),
  textRight: PropTypes.oneOf(breakpointValues),
  textWrap: PropTypes.bool,
  textNoWrap: PropTypes.bool,
  textBreak: PropTypes.bool,
  textTransform: PropTypes.oneOf(textTransformValues),
  fontWeight: PropTypes.oneOf(fontWeightValues),
  fontStyle: PropTypes.oneOf(fontStyleValues),
  lineHeight: PropTypes.oneOf(lineHeightValues),
  fontMonospace: PropTypes.bool,
  textReset: PropTypes.bool,
  textDecoration: PropTypes.oneOf(textDecorationValues),

  marginZero: PropTypes.oneOf(breakpointValues),
  marginOne: PropTypes.oneOf(breakpointValues),
  marginTwo: PropTypes.oneOf(breakpointValues),
  marginThree: PropTypes.oneOf(breakpointValues),
  marginFour: PropTypes.oneOf(breakpointValues),
  marginFive: PropTypes.oneOf(breakpointValues),
  marginAuto: PropTypes.oneOf(breakpointValues),
  marginTopZero: PropTypes.oneOf(breakpointValues),
  marginTopOne: PropTypes.oneOf(breakpointValues),
  marginTopTwo: PropTypes.oneOf(breakpointValues),
  marginTopThree: PropTypes.oneOf(breakpointValues),
  marginTopFour: PropTypes.oneOf(breakpointValues),
  marginTopFive: PropTypes.oneOf(breakpointValues),
  marginTopAuto: PropTypes.oneOf(breakpointValues),
  marginBottomZero: PropTypes.oneOf(breakpointValues),
  marginBottomOne: PropTypes.oneOf(breakpointValues),
  marginBottomTwo: PropTypes.oneOf(breakpointValues),
  marginBottomThree: PropTypes.oneOf(breakpointValues),
  marginBottomFour: PropTypes.oneOf(breakpointValues),
  marginBottomFive: PropTypes.oneOf(breakpointValues),
  marginBottomAuto: PropTypes.oneOf(breakpointValues),
  marginLeftZero: PropTypes.oneOf(breakpointValues),
  marginLeftOne: PropTypes.oneOf(breakpointValues),
  marginLeftTwo: PropTypes.oneOf(breakpointValues),
  marginLeftThree: PropTypes.oneOf(breakpointValues),
  marginLeftFour: PropTypes.oneOf(breakpointValues),
  marginLeftFive: PropTypes.oneOf(breakpointValues),
  marginLeftAuto: PropTypes.oneOf(breakpointValues),
  marginRightZero: PropTypes.oneOf(breakpointValues),
  marginRightOne: PropTypes.oneOf(breakpointValues),
  marginRightTwo: PropTypes.oneOf(breakpointValues),
  marginRightThree: PropTypes.oneOf(breakpointValues),
  marginRightFour: PropTypes.oneOf(breakpointValues),
  marginRightFive: PropTypes.oneOf(breakpointValues),
  marginRightAuto: PropTypes.oneOf(breakpointValues),
  marginXZero: PropTypes.oneOf(breakpointValues),
  marginXOne: PropTypes.oneOf(breakpointValues),
  marginXTwo: PropTypes.oneOf(breakpointValues),
  marginXThree: PropTypes.oneOf(breakpointValues),
  marginXFour: PropTypes.oneOf(breakpointValues),
  marginXFive: PropTypes.oneOf(breakpointValues),
  marginXAuto: PropTypes.oneOf(breakpointValues),
  marginYZero: PropTypes.oneOf(breakpointValues),
  marginYOne: PropTypes.oneOf(breakpointValues),
  marginYTwo: PropTypes.oneOf(breakpointValues),
  marginYThree: PropTypes.oneOf(breakpointValues),
  marginYFour: PropTypes.oneOf(breakpointValues),
  marginYFive: PropTypes.oneOf(breakpointValues),
  marginYAuto: PropTypes.oneOf(breakpointValues),

  paddingZero: PropTypes.oneOf(breakpointValues),
  paddingOne: PropTypes.oneOf(breakpointValues),
  paddingTwo: PropTypes.oneOf(breakpointValues),
  paddingThree: PropTypes.oneOf(breakpointValues),
  paddingFour: PropTypes.oneOf(breakpointValues),
  paddingFive: PropTypes.oneOf(breakpointValues),
  paddingAuto: PropTypes.oneOf(breakpointValues),
  paddingTopZero: PropTypes.oneOf(breakpointValues),
  paddingTopOne: PropTypes.oneOf(breakpointValues),
  paddingTopTwo: PropTypes.oneOf(breakpointValues),
  paddingTopThree: PropTypes.oneOf(breakpointValues),
  paddingTopFour: PropTypes.oneOf(breakpointValues),
  paddingTopFive: PropTypes.oneOf(breakpointValues),
  paddingTopAuto: PropTypes.oneOf(breakpointValues),
  paddingBottomZero: PropTypes.oneOf(breakpointValues),
  paddingBottomOne: PropTypes.oneOf(breakpointValues),
  paddingBottomTwo: PropTypes.oneOf(breakpointValues),
  paddingBottomThree: PropTypes.oneOf(breakpointValues),
  paddingBottomFour: PropTypes.oneOf(breakpointValues),
  paddingBottomFive: PropTypes.oneOf(breakpointValues),
  paddingBottomAuto: PropTypes.oneOf(breakpointValues),
  paddingLeftZero: PropTypes.oneOf(breakpointValues),
  paddingLeftOne: PropTypes.oneOf(breakpointValues),
  paddingLeftTwo: PropTypes.oneOf(breakpointValues),
  paddingLeftThree: PropTypes.oneOf(breakpointValues),
  paddingLeftFour: PropTypes.oneOf(breakpointValues),
  paddingLeftFive: PropTypes.oneOf(breakpointValues),
  paddingLeftAuto: PropTypes.oneOf(breakpointValues),
  paddingRightZero: PropTypes.oneOf(breakpointValues),
  paddingRightOne: PropTypes.oneOf(breakpointValues),
  paddingRightTwo: PropTypes.oneOf(breakpointValues),
  paddingRightThree: PropTypes.oneOf(breakpointValues),
  paddingRightFour: PropTypes.oneOf(breakpointValues),
  paddingRightFive: PropTypes.oneOf(breakpointValues),
  paddingRightAuto: PropTypes.oneOf(breakpointValues),
  paddingXZero: PropTypes.oneOf(breakpointValues),
  paddingXOne: PropTypes.oneOf(breakpointValues),
  paddingXTwo: PropTypes.oneOf(breakpointValues),
  paddingXThree: PropTypes.oneOf(breakpointValues),
  paddingXFour: PropTypes.oneOf(breakpointValues),
  paddingXFive: PropTypes.oneOf(breakpointValues),
  paddingXAuto: PropTypes.oneOf(breakpointValues),
  paddingYZero: PropTypes.oneOf(breakpointValues),
  paddingYOne: PropTypes.oneOf(breakpointValues),
  paddingYTwo: PropTypes.oneOf(breakpointValues),
  paddingYThree: PropTypes.oneOf(breakpointValues),
  paddingYFour: PropTypes.oneOf(breakpointValues),
  paddingYFive: PropTypes.oneOf(breakpointValues),
  paddingYAuto: PropTypes.oneOf(breakpointValues),

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

    overflow: Overflow;

    position: Position;

    shadow: Shadow;

    align: Alignment;
    alignText: Alignment;

    width: Sizing;
    height: Sizing;
    maxWidth: boolean;
    maxHeight: boolean;
    viewportWidth: boolean;
    viewportHeight: boolean;
    minViewportWidth: boolean;
    minViewportHeight: boolean;

    textLeft: Breakpoint;
    textCenter: Breakpoint;
    textRight: Breakpoint;
    textWrap: boolean;
    textNoWrap: boolean;
    textBreak: boolean;
    textTransform: TextTransform;
    fontWeight: FontWeight;
    fontStyle: FontStyle;
    lineHeight: LineHeight;
    fontMonospace: boolean;
    textReset: boolean;
    textDecoration: TextDecoration;

    marginZero: Breakpoint;
    marginOne: Breakpoint;
    marginTwo: Breakpoint;
    marginThree: Breakpoint;
    marginFour: Breakpoint;
    marginFive: Breakpoint;
    marginAuto: Breakpoint;
    marginTopZero: Breakpoint;
    marginTopOne: Breakpoint;
    marginTopTwo: Breakpoint;
    marginTopThree: Breakpoint;
    marginTopFour: Breakpoint;
    marginTopFive: Breakpoint;
    marginTopAuto: Breakpoint;
    marginBottomZero: Breakpoint;
    marginBottomOne: Breakpoint;
    marginBottomTwo: Breakpoint;
    marginBottomThree: Breakpoint;
    marginBottomFour: Breakpoint;
    marginBottomFive: Breakpoint;
    marginBottomAuto: Breakpoint;
    marginLeftZero: Breakpoint;
    marginLeftOne: Breakpoint;
    marginLeftTwo: Breakpoint;
    marginLeftThree: Breakpoint;
    marginLeftFour: Breakpoint;
    marginLeftFive: Breakpoint;
    marginLeftAuto: Breakpoint;
    marginRightZero: Breakpoint;
    marginRightOne: Breakpoint;
    marginRightTwo: Breakpoint;
    marginRightThree: Breakpoint;
    marginRightFour: Breakpoint;
    marginRightFive: Breakpoint;
    marginRightAuto: Breakpoint;
    marginXZero: Breakpoint;
    marginXOne: Breakpoint;
    marginXTwo: Breakpoint;
    marginXThree: Breakpoint;
    marginXFour: Breakpoint;
    marginXFive: Breakpoint;
    marginXAuto: Breakpoint;
    marginYZero: Breakpoint;
    marginYOne: Breakpoint;
    marginYTwo: Breakpoint;
    marginYThree: Breakpoint;
    marginYFour: Breakpoint;
    marginYFive: Breakpoint;
    marginYAuto: Breakpoint;

    paddingZero: Breakpoint;
    paddingOne: Breakpoint;
    paddingTwo: Breakpoint;
    paddingThree: Breakpoint;
    paddingFour: Breakpoint;
    paddingFive: Breakpoint;
    paddingAuto: Breakpoint;
    paddingTopZero: Breakpoint;
    paddingTopOne: Breakpoint;
    paddingTopTwo: Breakpoint;
    paddingTopThree: Breakpoint;
    paddingTopFour: Breakpoint;
    paddingTopFive: Breakpoint;
    paddingTopAuto: Breakpoint;
    paddingBottomZero: Breakpoint;
    paddingBottomOne: Breakpoint;
    paddingBottomTwo: Breakpoint;
    paddingBottomThree: Breakpoint;
    paddingBottomFour: Breakpoint;
    paddingBottomFive: Breakpoint;
    paddingBottomAuto: Breakpoint;
    paddingLeftZero: Breakpoint;
    paddingLeftOne: Breakpoint;
    paddingLeftTwo: Breakpoint;
    paddingLeftThree: Breakpoint;
    paddingLeftFour: Breakpoint;
    paddingLeftFive: Breakpoint;
    paddingLeftAuto: Breakpoint;
    paddingRightZero: Breakpoint;
    paddingRightOne: Breakpoint;
    paddingRightTwo: Breakpoint;
    paddingRightThree: Breakpoint;
    paddingRightFour: Breakpoint;
    paddingRightFive: Breakpoint;
    paddingRightAuto: Breakpoint;
    paddingXZero: Breakpoint;
    paddingXOne: Breakpoint;
    paddingXTwo: Breakpoint;
    paddingXThree: Breakpoint;
    paddingXFour: Breakpoint;
    paddingXFive: Breakpoint;
    paddingXAuto: Breakpoint;
    paddingYZero: Breakpoint;
    paddingYOne: Breakpoint;
    paddingYTwo: Breakpoint;
    paddingYThree: Breakpoint;
    paddingYFour: Breakpoint;
    paddingYFive: Breakpoint;
    paddingYAuto: Breakpoint;

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
      overflow,
      position,
      shadow,
      align,
      alignText,
      width,
      height,
      maxWidth,
      maxHeight,
      viewportWidth,
      viewportHeight,
      minViewportWidth,
      minViewportHeight,
      textLeft,
      textCenter,
      textRight,
      textWrap,
      textNoWrap,
      textBreak,
      textTransform,
      fontWeight,
      fontStyle,
      lineHeight,
      fontMonospace,
      textReset,
      textDecoration,
      pe,
      print,
      visible,
      marginZero,
      marginOne,
      marginTwo,
      marginThree,
      marginFour,
      marginFive,
      marginAuto,
      marginTopZero,
      marginTopOne,
      marginTopTwo,
      marginTopThree,
      marginTopFour,
      marginTopFive,
      marginTopAuto,
      marginBottomZero,
      marginBottomOne,
      marginBottomTwo,
      marginBottomThree,
      marginBottomFour,
      marginBottomFive,
      marginBottomAuto,
      marginLeftZero,
      marginLeftOne,
      marginLeftTwo,
      marginLeftThree,
      marginLeftFour,
      marginLeftFive,
      marginLeftAuto,
      marginRightZero,
      marginRightOne,
      marginRightTwo,
      marginRightThree,
      marginRightFour,
      marginRightFive,
      marginRightAuto,
      marginXZero,
      marginXOne,
      marginXTwo,
      marginXThree,
      marginXFour,
      marginXFive,
      marginXAuto,
      marginYZero,
      marginYOne,
      marginYTwo,
      marginYThree,
      marginYFour,
      marginYFive,
      marginYAuto,
      paddingZero,
      paddingOne,
      paddingTwo,
      paddingThree,
      paddingFour,
      paddingFive,
      paddingAuto,
      paddingTopZero,
      paddingTopOne,
      paddingTopTwo,
      paddingTopThree,
      paddingTopFour,
      paddingTopFive,
      paddingTopAuto,
      paddingBottomZero,
      paddingBottomOne,
      paddingBottomTwo,
      paddingBottomThree,
      paddingBottomFour,
      paddingBottomFive,
      paddingBottomAuto,
      paddingLeftZero,
      paddingLeftOne,
      paddingLeftTwo,
      paddingLeftThree,
      paddingLeftFour,
      paddingLeftFive,
      paddingLeftAuto,
      paddingRightZero,
      paddingRightOne,
      paddingRightTwo,
      paddingRightThree,
      paddingRightFour,
      paddingRightFive,
      paddingRightAuto,
      paddingXZero,
      paddingXOne,
      paddingXTwo,
      paddingXThree,
      paddingXFour,
      paddingXFive,
      paddingXAuto,
      paddingYZero,
      paddingYOne,
      paddingYTwo,
      paddingYThree,
      paddingYFour,
      paddingYFive,
      paddingYAuto,
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
      position,
      shadow,
      align,
      alignText,
      pe,
      overflow,
      width,
      height,
      maxWidth,
      maxHeight,
      viewportWidth,
      viewportHeight,
      minViewportWidth,
      minViewportHeight,
      textLeft,
      textCenter,
      textRight,
      textWrap,
      textNoWrap,
      textBreak,
      textTransform,
      fontWeight,
      fontStyle,
      lineHeight,
      fontMonospace,
      textReset,
      textDecoration,
      marginZero,
      marginOne,
      marginTwo,
      marginThree,
      marginFour,
      marginFive,
      marginAuto,
      marginTopZero,
      marginTopOne,
      marginTopTwo,
      marginTopThree,
      marginTopFour,
      marginTopFive,
      marginTopAuto,
      marginBottomZero,
      marginBottomOne,
      marginBottomTwo,
      marginBottomThree,
      marginBottomFour,
      marginBottomFive,
      marginBottomAuto,
      marginLeftZero,
      marginLeftOne,
      marginLeftTwo,
      marginLeftThree,
      marginLeftFour,
      marginLeftFive,
      marginLeftAuto,
      marginRightZero,
      marginRightOne,
      marginRightTwo,
      marginRightThree,
      marginRightFour,
      marginRightFive,
      marginRightAuto,
      marginXZero,
      marginXOne,
      marginXTwo,
      marginXThree,
      marginXFour,
      marginXFive,
      marginXAuto,
      marginYZero,
      marginYOne,
      marginYTwo,
      marginYThree,
      marginYFour,
      marginYFive,
      marginYAuto,
      paddingZero,
      paddingOne,
      paddingTwo,
      paddingThree,
      paddingFour,
      paddingFive,
      paddingAuto,
      paddingTopZero,
      paddingTopOne,
      paddingTopTwo,
      paddingTopThree,
      paddingTopFour,
      paddingTopFive,
      paddingTopAuto,
      paddingBottomZero,
      paddingBottomOne,
      paddingBottomTwo,
      paddingBottomThree,
      paddingBottomFour,
      paddingBottomFive,
      paddingBottomAuto,
      paddingLeftZero,
      paddingLeftOne,
      paddingLeftTwo,
      paddingLeftThree,
      paddingLeftFour,
      paddingLeftFive,
      paddingLeftAuto,
      paddingRightZero,
      paddingRightOne,
      paddingRightTwo,
      paddingRightThree,
      paddingRightFour,
      paddingRightFive,
      paddingRightAuto,
      paddingXZero,
      paddingXOne,
      paddingXTwo,
      paddingXThree,
      paddingXFour,
      paddingXFive,
      paddingXAuto,
      paddingYZero,
      paddingYOne,
      paddingYTwo,
      paddingYThree,
      paddingYFour,
      paddingYFive,
      paddingYAuto,
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
