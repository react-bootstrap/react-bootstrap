import { describe, expect, it } from 'vitest';
import * as Utility from '../src/Utility';

/**
 * Verifies that every exported constant from src/Utility.ts:
 *  1. Is a string.
 *  2. Matches the documented CSS class value.
 *  3. Is frozen (TypeScript `as const` guarantees the literal type, but the
 *     runtime value should still equal the expected string).
 */
describe('Utility constants', () => {
  // Helper to test a single export
  function expectClass(exportName: keyof typeof Utility, expected: string) {
    it(`${exportName} === '${expected}'`, () => {
      expect(Utility[exportName]).toBe(expected);
    });
  }

  // ---------------------------------------------------------------------------
  // Typography — text alignment
  // ---------------------------------------------------------------------------
  describe('text alignment', () => {
    expectClass('classTextStart', 'text-start');
    expectClass('classTextCenter', 'text-center');
    expectClass('classTextEnd', 'text-end');
  });

  // ---------------------------------------------------------------------------
  // Typography — text wrapping
  // ---------------------------------------------------------------------------
  describe('text wrapping', () => {
    expectClass('classTextWrap', 'text-wrap');
    expectClass('classTextNowrap', 'text-nowrap');
    expectClass('classTextBreak', 'text-break');
    expectClass('classTextTruncate', 'text-truncate');
  });

  // ---------------------------------------------------------------------------
  // Typography — text transformation
  // ---------------------------------------------------------------------------
  describe('text transformation', () => {
    expectClass('classTextLowercase', 'text-lowercase');
    expectClass('classTextUppercase', 'text-uppercase');
    expectClass('classTextCapitalize', 'text-capitalize');
  });

  // ---------------------------------------------------------------------------
  // Typography — text decoration
  // ---------------------------------------------------------------------------
  describe('text decoration', () => {
    expectClass('classTextDecorationUnderline', 'text-decoration-underline');
    expectClass(
      'classTextDecorationLineThrough',
      'text-decoration-line-through',
    );
    expectClass('classTextDecorationNone', 'text-decoration-none');
  });

  // ---------------------------------------------------------------------------
  // Typography — font style
  // ---------------------------------------------------------------------------
  describe('font style', () => {
    expectClass('classFstItalic', 'fst-italic');
    expectClass('classFstNormal', 'fst-normal');
  });

  // ---------------------------------------------------------------------------
  // Typography — font weight
  // ---------------------------------------------------------------------------
  describe('font weight', () => {
    expectClass('classFwBold', 'fw-bold');
    expectClass('classFwBolder', 'fw-bolder');
    expectClass('classFwSemibold', 'fw-semibold');
    expectClass('classFwMedium', 'fw-medium');
    expectClass('classFwNormal', 'fw-normal');
    expectClass('classFwLight', 'fw-light');
    expectClass('classFwLighter', 'fw-lighter');
  });

  // ---------------------------------------------------------------------------
  // Typography — font family
  // ---------------------------------------------------------------------------
  describe('font family', () => {
    expectClass('classTextMonospace', 'font-monospace');
  });

  // ---------------------------------------------------------------------------
  // Typography — line height
  // ---------------------------------------------------------------------------
  describe('line height', () => {
    expectClass('classLh1', 'lh-1');
    expectClass('classLhSm', 'lh-sm');
    expectClass('classLhBase', 'lh-base');
    expectClass('classLhLg', 'lh-lg');
  });

  // ---------------------------------------------------------------------------
  // Typography — text reset / muted
  // ---------------------------------------------------------------------------
  describe('text reset / muted', () => {
    expectClass('classTextReset', 'text-reset');
    expectClass('classTextMuted', 'text-muted');
  });

  // ---------------------------------------------------------------------------
  // Visually hidden
  // ---------------------------------------------------------------------------
  describe('visually hidden', () => {
    expectClass('classVisuallyHidden', 'visually-hidden');
    expectClass('classVisuallyHiddenFocusable', 'visually-hidden-focusable');
  });

  // ---------------------------------------------------------------------------
  // Text colors (semantic)
  // ---------------------------------------------------------------------------
  describe('text colors', () => {
    expectClass('classTextPrimary', 'text-primary');
    expectClass('classTextSecondary', 'text-secondary');
    expectClass('classTextSuccess', 'text-success');
    expectClass('classTextDanger', 'text-danger');
    expectClass('classTextWarning', 'text-warning');
    expectClass('classTextInfo', 'text-info');
    expectClass('classTextLight', 'text-light');
    expectClass('classTextDark', 'text-dark');
    expectClass('classTextBody', 'text-body');
    expectClass('classTextBlack', 'text-black');
    expectClass('classTextWhite', 'text-white');
    expectClass('classTextBlack50', 'text-black-50');
    expectClass('classTextWhite50', 'text-white-50');
  });

  // ---------------------------------------------------------------------------
  // Text opacity
  // ---------------------------------------------------------------------------
  describe('text opacity', () => {
    expectClass('classTextOpacity25', 'text-opacity-25');
    expectClass('classTextOpacity50', 'text-opacity-50');
    expectClass('classTextOpacity75', 'text-opacity-75');
    expectClass('classTextOpacity100', 'text-opacity-100');
  });

  // ---------------------------------------------------------------------------
  // Background colors
  // ---------------------------------------------------------------------------
  describe('background colors', () => {
    expectClass('classBgPrimary', 'bg-primary');
    expectClass('classBgSecondary', 'bg-secondary');
    expectClass('classBgSuccess', 'bg-success');
    expectClass('classBgDanger', 'bg-danger');
    expectClass('classBgWarning', 'bg-warning');
    expectClass('classBgInfo', 'bg-info');
    expectClass('classBgLight', 'bg-light');
    expectClass('classBgDark', 'bg-dark');
    expectClass('classBgBody', 'bg-body');
    expectClass('classBgWhite', 'bg-white');
    expectClass('classBgBlack', 'bg-black');
    expectClass('classBgTransparent', 'bg-transparent');
    expectClass('classBgGradient', 'bg-gradient');
  });

  // ---------------------------------------------------------------------------
  // Background opacity
  // ---------------------------------------------------------------------------
  describe('background opacity', () => {
    expectClass('classBgOpacity10', 'bg-opacity-10');
    expectClass('classBgOpacity25', 'bg-opacity-25');
    expectClass('classBgOpacity50', 'bg-opacity-50');
    expectClass('classBgOpacity75', 'bg-opacity-75');
    expectClass('classBgOpacity100', 'bg-opacity-100');
  });

  // ---------------------------------------------------------------------------
  // Border — add / remove
  // ---------------------------------------------------------------------------
  describe('border add/remove', () => {
    expectClass('classBorder', 'border');
    expectClass('classBorderTop', 'border-top');
    expectClass('classBorderBottom', 'border-bottom');
    expectClass('classBorderStart', 'border-start');
    expectClass('classBorderEnd', 'border-end');
    expectClass('classBorder0', 'border-0');
    expectClass('classBorderTop0', 'border-top-0');
    expectClass('classBorderBottom0', 'border-bottom-0');
    expectClass('classBorderStart0', 'border-start-0');
    expectClass('classBorderEnd0', 'border-end-0');
  });

  // ---------------------------------------------------------------------------
  // Border — colors
  // ---------------------------------------------------------------------------
  describe('border colors', () => {
    expectClass('classBorderPrimary', 'border-primary');
    expectClass('classBorderSecondary', 'border-secondary');
    expectClass('classBorderSuccess', 'border-success');
    expectClass('classBorderDanger', 'border-danger');
    expectClass('classBorderWarning', 'border-warning');
    expectClass('classBorderInfo', 'border-info');
    expectClass('classBorderLight', 'border-light');
    expectClass('classBorderDark', 'border-dark');
    expectClass('classBorderWhite', 'border-white');
    expectClass('classBorderBlack', 'border-black');
  });

  // ---------------------------------------------------------------------------
  // Border — widths
  // ---------------------------------------------------------------------------
  describe('border widths', () => {
    expectClass('classBorderWidth1', 'border-1');
    expectClass('classBorderWidth2', 'border-2');
    expectClass('classBorderWidth3', 'border-3');
    expectClass('classBorderWidth4', 'border-4');
    expectClass('classBorderWidth5', 'border-5');
  });

  // ---------------------------------------------------------------------------
  // Border — opacity
  // ---------------------------------------------------------------------------
  describe('border opacity', () => {
    expectClass('classBorderOpacity10', 'border-opacity-10');
    expectClass('classBorderOpacity25', 'border-opacity-25');
    expectClass('classBorderOpacity50', 'border-opacity-50');
    expectClass('classBorderOpacity75', 'border-opacity-75');
    expectClass('classBorderOpacity100', 'border-opacity-100');
  });

  // ---------------------------------------------------------------------------
  // Border — rounded
  // ---------------------------------------------------------------------------
  describe('rounded corners', () => {
    expectClass('classRounded', 'rounded');
    expectClass('classRoundedTop', 'rounded-top');
    expectClass('classRoundedBottom', 'rounded-bottom');
    expectClass('classRoundedStart', 'rounded-start');
    expectClass('classRoundedEnd', 'rounded-end');
    expectClass('classRoundedCircle', 'rounded-circle');
    expectClass('classRoundedPill', 'rounded-pill');
    expectClass('classRounded0', 'rounded-0');
    expectClass('classRounded1', 'rounded-1');
    expectClass('classRounded2', 'rounded-2');
    expectClass('classRounded3', 'rounded-3');
    expectClass('classRounded4', 'rounded-4');
    expectClass('classRounded5', 'rounded-5');
  });

  // ---------------------------------------------------------------------------
  // Display
  // ---------------------------------------------------------------------------
  describe('display', () => {
    expectClass('classDNone', 'd-none');
    expectClass('classDInline', 'd-inline');
    expectClass('classDInlineBlock', 'd-inline-block');
    expectClass('classDBlock', 'd-block');
    expectClass('classDGrid', 'd-grid');
    expectClass('classDInlineGrid', 'd-inline-grid');
    expectClass('classDTable', 'd-table');
    expectClass('classDTableRow', 'd-table-row');
    expectClass('classDTableCell', 'd-table-cell');
    expectClass('classDFlex', 'd-flex');
    expectClass('classDInlineFlex', 'd-inline-flex');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — direction
  // ---------------------------------------------------------------------------
  describe('flex direction', () => {
    expectClass('classFlexRow', 'flex-row');
    expectClass('classFlexRowReverse', 'flex-row-reverse');
    expectClass('classFlexColumn', 'flex-column');
    expectClass('classFlexColumnReverse', 'flex-column-reverse');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — wrap
  // ---------------------------------------------------------------------------
  describe('flex wrap', () => {
    expectClass('classFlexWrap', 'flex-wrap');
    expectClass('classFlexNowrap', 'flex-nowrap');
    expectClass('classFlexWrapReverse', 'flex-wrap-reverse');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — fill, grow, shrink
  // ---------------------------------------------------------------------------
  describe('flex fill/grow/shrink', () => {
    expectClass('classFlexFill', 'flex-fill');
    expectClass('classFlexGrow0', 'flex-grow-0');
    expectClass('classFlexGrow1', 'flex-grow-1');
    expectClass('classFlexShrink0', 'flex-shrink-0');
    expectClass('classFlexShrink1', 'flex-shrink-1');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — justify-content
  // ---------------------------------------------------------------------------
  describe('justify-content', () => {
    expectClass('classJustifyContentStart', 'justify-content-start');
    expectClass('classJustifyContentEnd', 'justify-content-end');
    expectClass('classJustifyContentCenter', 'justify-content-center');
    expectClass('classJustifyContentBetween', 'justify-content-between');
    expectClass('classJustifyContentAround', 'justify-content-around');
    expectClass('classJustifyContentEvenly', 'justify-content-evenly');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — align-items
  // ---------------------------------------------------------------------------
  describe('align-items', () => {
    expectClass('classAlignItemsStart', 'align-items-start');
    expectClass('classAlignItemsEnd', 'align-items-end');
    expectClass('classAlignItemsCenter', 'align-items-center');
    expectClass('classAlignItemsBaseline', 'align-items-baseline');
    expectClass('classAlignItemsStretch', 'align-items-stretch');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — align-self
  // ---------------------------------------------------------------------------
  describe('align-self', () => {
    expectClass('classAlignSelfAuto', 'align-self-auto');
    expectClass('classAlignSelfStart', 'align-self-start');
    expectClass('classAlignSelfEnd', 'align-self-end');
    expectClass('classAlignSelfCenter', 'align-self-center');
    expectClass('classAlignSelfBaseline', 'align-self-baseline');
    expectClass('classAlignSelfStretch', 'align-self-stretch');
  });

  // ---------------------------------------------------------------------------
  // Flexbox — align-content
  // ---------------------------------------------------------------------------
  describe('align-content', () => {
    expectClass('classAlignContentStart', 'align-content-start');
    expectClass('classAlignContentEnd', 'align-content-end');
    expectClass('classAlignContentCenter', 'align-content-center');
    expectClass('classAlignContentBetween', 'align-content-between');
    expectClass('classAlignContentAround', 'align-content-around');
    expectClass('classAlignContentStretch', 'align-content-stretch');
  });

  // ---------------------------------------------------------------------------
  // Sizing — width
  // ---------------------------------------------------------------------------
  describe('sizing width', () => {
    expectClass('classW25', 'w-25');
    expectClass('classW50', 'w-50');
    expectClass('classW75', 'w-75');
    expectClass('classW100', 'w-100');
    expectClass('classWAuto', 'w-auto');
    expectClass('classMw100', 'mw-100');
    expectClass('classVw100', 'vw-100');
    expectClass('classMinVw100', 'min-vw-100');
  });

  // ---------------------------------------------------------------------------
  // Sizing — height
  // ---------------------------------------------------------------------------
  describe('sizing height', () => {
    expectClass('classH25', 'h-25');
    expectClass('classH50', 'h-50');
    expectClass('classH75', 'h-75');
    expectClass('classH100', 'h-100');
    expectClass('classHAuto', 'h-auto');
    expectClass('classMh100', 'mh-100');
    expectClass('classVh100', 'vh-100');
    expectClass('classMinVh100', 'min-vh-100');
  });

  // ---------------------------------------------------------------------------
  // Spacing — auto margins
  // ---------------------------------------------------------------------------
  describe('spacing auto margins', () => {
    expectClass('classMxAuto', 'mx-auto');
    expectClass('classMyAuto', 'my-auto');
    expectClass('classMsAuto', 'ms-auto');
    expectClass('classMeAuto', 'me-auto');
    expectClass('classMtAuto', 'mt-auto');
    expectClass('classMbAuto', 'mb-auto');
    expectClass('classMAuto', 'm-auto');
  });

  // ---------------------------------------------------------------------------
  // Position
  // ---------------------------------------------------------------------------
  describe('position', () => {
    expectClass('classPositionStatic', 'position-static');
    expectClass('classPositionRelative', 'position-relative');
    expectClass('classPositionAbsolute', 'position-absolute');
    expectClass('classPositionFixed', 'position-fixed');
    expectClass('classPositionSticky', 'position-sticky');

    expectClass('classTop0', 'top-0');
    expectClass('classTop50', 'top-50');
    expectClass('classTop100', 'top-100');
    expectClass('classBottom0', 'bottom-0');
    expectClass('classBottom50', 'bottom-50');
    expectClass('classBottom100', 'bottom-100');
    expectClass('classStart0', 'start-0');
    expectClass('classStart50', 'start-50');
    expectClass('classStart100', 'start-100');
    expectClass('classEnd0', 'end-0');
    expectClass('classEnd50', 'end-50');
    expectClass('classEnd100', 'end-100');

    expectClass('classTranslateMiddle', 'translate-middle');
    expectClass('classTranslateMiddleX', 'translate-middle-x');
    expectClass('classTranslateMiddleY', 'translate-middle-y');
  });

  // ---------------------------------------------------------------------------
  // Overflow
  // ---------------------------------------------------------------------------
  describe('overflow', () => {
    expectClass('classOverflowAuto', 'overflow-auto');
    expectClass('classOverflowHidden', 'overflow-hidden');
    expectClass('classOverflowVisible', 'overflow-visible');
    expectClass('classOverflowScroll', 'overflow-scroll');
    expectClass('classOverflowXAuto', 'overflow-x-auto');
    expectClass('classOverflowXHidden', 'overflow-x-hidden');
    expectClass('classOverflowXVisible', 'overflow-x-visible');
    expectClass('classOverflowXScroll', 'overflow-x-scroll');
    expectClass('classOverflowYAuto', 'overflow-y-auto');
    expectClass('classOverflowYHidden', 'overflow-y-hidden');
    expectClass('classOverflowYVisible', 'overflow-y-visible');
    expectClass('classOverflowYScroll', 'overflow-y-scroll');
  });

  // ---------------------------------------------------------------------------
  // Visibility
  // ---------------------------------------------------------------------------
  describe('visibility', () => {
    expectClass('classVisible', 'visible');
    expectClass('classInvisible', 'invisible');
  });

  // ---------------------------------------------------------------------------
  // Opacity
  // ---------------------------------------------------------------------------
  describe('opacity', () => {
    expectClass('classOpacity0', 'opacity-0');
    expectClass('classOpacity25', 'opacity-25');
    expectClass('classOpacity50', 'opacity-50');
    expectClass('classOpacity75', 'opacity-75');
    expectClass('classOpacity100', 'opacity-100');
  });

  // ---------------------------------------------------------------------------
  // Shadow
  // ---------------------------------------------------------------------------
  describe('shadow', () => {
    expectClass('classShadow', 'shadow');
    expectClass('classShadowSm', 'shadow-sm');
    expectClass('classShadowLg', 'shadow-lg');
    expectClass('classShadowNone', 'shadow-none');
  });

  // ---------------------------------------------------------------------------
  // Float
  // ---------------------------------------------------------------------------
  describe('float', () => {
    expectClass('classFloatStart', 'float-start');
    expectClass('classFloatEnd', 'float-end');
    expectClass('classFloatNone', 'float-none');
  });

  // ---------------------------------------------------------------------------
  // Clearfix
  // ---------------------------------------------------------------------------
  describe('clearfix', () => {
    expectClass('classClearfix', 'clearfix');
  });

  // ---------------------------------------------------------------------------
  // Stretched link
  // ---------------------------------------------------------------------------
  describe('stretched-link', () => {
    expectClass('classStretchedLink', 'stretched-link');
  });

  // ---------------------------------------------------------------------------
  // User interaction
  // ---------------------------------------------------------------------------
  describe('user interaction', () => {
    expectClass('classUserSelectAll', 'user-select-all');
    expectClass('classUserSelectAuto', 'user-select-auto');
    expectClass('classUserSelectNone', 'user-select-none');
    expectClass('classPeNone', 'pe-none');
    expectClass('classPeAuto', 'pe-auto');
  });

  // ---------------------------------------------------------------------------
  // Object fit
  // ---------------------------------------------------------------------------
  describe('object-fit', () => {
    expectClass('classObjectFitContain', 'object-fit-contain');
    expectClass('classObjectFitCover', 'object-fit-cover');
    expectClass('classObjectFitFill', 'object-fit-fill');
    expectClass('classObjectFitScale', 'object-fit-scale');
    expectClass('classObjectFitNone', 'object-fit-none');
  });

  // ---------------------------------------------------------------------------
  // Z-index
  // ---------------------------------------------------------------------------
  describe('z-index', () => {
    expectClass('classZN1', 'z-n1');
    expectClass('classZ0', 'z-0');
    expectClass('classZ1', 'z-1');
    expectClass('classZ2', 'z-2');
    expectClass('classZ3', 'z-3');
  });

  // ---------------------------------------------------------------------------
  // Focus ring
  // ---------------------------------------------------------------------------
  describe('focus-ring', () => {
    expectClass('classFocusRing', 'focus-ring');
  });

  // ---------------------------------------------------------------------------
  // Link colors
  // ---------------------------------------------------------------------------
  describe('link colors', () => {
    expectClass('classLinkPrimary', 'link-primary');
    expectClass('classLinkSecondary', 'link-secondary');
    expectClass('classLinkSuccess', 'link-success');
    expectClass('classLinkDanger', 'link-danger');
    expectClass('classLinkWarning', 'link-warning');
    expectClass('classLinkInfo', 'link-info');
    expectClass('classLinkLight', 'link-light');
    expectClass('classLinkDark', 'link-dark');
  });

  // ---------------------------------------------------------------------------
  // Link underline utilities
  // ---------------------------------------------------------------------------
  describe('link underline', () => {
    expectClass('classLinkUnderline', 'link-underline');
    expectClass('classLinkUnderlinePrimary', 'link-underline-primary');
    expectClass('classLinkUnderlineSecondary', 'link-underline-secondary');
    expectClass('classLinkUnderlineSuccess', 'link-underline-success');
    expectClass('classLinkUnderlineDanger', 'link-underline-danger');
    expectClass('classLinkUnderlineWarning', 'link-underline-warning');
    expectClass('classLinkUnderlineInfo', 'link-underline-info');
    expectClass('classLinkUnderlineLight', 'link-underline-light');
    expectClass('classLinkUnderlineDark', 'link-underline-dark');
  });

  // ---------------------------------------------------------------------------
  // Print display utilities
  // ---------------------------------------------------------------------------
  describe('print display', () => {
    expectClass('classDPrintNone', 'd-print-none');
    expectClass('classDPrintInline', 'd-print-inline');
    expectClass('classDPrintInlineBlock', 'd-print-inline-block');
    expectClass('classDPrintBlock', 'd-print-block');
    expectClass('classDPrintGrid', 'd-print-grid');
    expectClass('classDPrintTable', 'd-print-table');
    expectClass('classDPrintTableRow', 'd-print-table-row');
    expectClass('classDPrintTableCell', 'd-print-table-cell');
    expectClass('classDPrintFlex', 'd-print-flex');
    expectClass('classDPrintInlineFlex', 'd-print-inline-flex');
  });

  // ---------------------------------------------------------------------------
  // Integration: constants are usable as className values
  // ---------------------------------------------------------------------------
  it('constants can be concatenated as className strings', () => {
    const className = [
      Utility.classDFlex,
      Utility.classFlexColumn,
      Utility.classAlignItemsCenter,
      Utility.classJustifyContentBetween,
      Utility.classTextMonospace,
    ].join(' ');

    expect(className).toBe(
      'd-flex flex-column align-items-center justify-content-between font-monospace',
    );
  });
});
