/**
 * Bootstrap 5 standalone utility class name constants.
 *
 * These constants cover Bootstrap utility categories that map to a single,
 * fixed CSS class string — i.e., classes that are not parameterized by a
 * value or breakpoint suffix. Responsive / numeric variants (e.g. `mt-3`,
 * `d-md-flex`) are intentionally excluded because they are already handled
 * dynamically by `createUtilityClasses` and the component prop APIs.
 *
 * Import individual constants from this module:
 *
 * ```tsx
 * import { classTextMonospace } from 'react-bootstrap/Utility';
 * ```
 *
 * Scope of exported constants
 * ----------------------------
 * - **Typography / Text**: alignment, transformation, decoration, wrapping,
 *   font style, font weight, font monospace, line-height, word-break,
 *   text reset, text truncate, visually-hidden helpers
 * - **Background**: contextual backgrounds, gradient, transparent
 * - **Border**: add/remove borders, border colors, border widths,
 *   rounded corners
 * - **Display**: d-none, d-inline, d-block, d-flex, d-grid, d-table family
 * - **Flex**: direction, justify-content, align-items, align-self,
 *   wrap, fill, grow, shrink
 * - **Sizing**: w-*, h-* fixed utilities (25/50/75/100/auto)
 * - **Spacing**: mx-auto, my-auto (the only fully-fixed spacing constants;
 *   numeric m/p variants are excluded as they are parameterized)
 * - **Position**: position type, inset helpers (top/bottom/start/end),
 *   translate-middle
 * - **Overflow**: overflow-auto, overflow-hidden, overflow-visible,
 *   overflow-scroll, overflow-x/y variants
 * - **Visibility**: visible, invisible
 * - **Opacity**: opacity-0/25/50/75/100
 * - **Shadow**: shadow, shadow-sm, shadow-lg, shadow-none
 * - **Float**: float-start, float-end, float-none
 * - **Interaction**: user-select, pointer-events
 * - **Object fit**: object-fit utilities
 * - **Z-index**: z-* utilities (n1, 0, 1, 2, 3)
 * - **Stretched link**: stretched-link
 * - **Clearfix**: clearfix
 * - **Link**: link-* color / underline utilities
 * - **Focus ring**: focus-ring
 * - **Text colors** (semantic): text-* contextual and special values
 * - **Print**: d-print-* utilities
 */

// ---------------------------------------------------------------------------
// Typography — Text alignment
// ---------------------------------------------------------------------------

/** `text-start` */
export const classTextStart = 'text-start' as const;
/** `text-center` */
export const classTextCenter = 'text-center' as const;
/** `text-end` */
export const classTextEnd = 'text-end' as const;

// ---------------------------------------------------------------------------
// Typography — Text wrapping
// ---------------------------------------------------------------------------

/** `text-wrap` */
export const classTextWrap = 'text-wrap' as const;
/** `text-nowrap` */
export const classTextNowrap = 'text-nowrap' as const;
/** `text-break` — enables word-break on long strings */
export const classTextBreak = 'text-break' as const;
/** `text-truncate` — truncates overflowing text with an ellipsis */
export const classTextTruncate = 'text-truncate' as const;

// ---------------------------------------------------------------------------
// Typography — Text transformation
// ---------------------------------------------------------------------------

/** `text-lowercase` */
export const classTextLowercase = 'text-lowercase' as const;
/** `text-uppercase` */
export const classTextUppercase = 'text-uppercase' as const;
/** `text-capitalize` */
export const classTextCapitalize = 'text-capitalize' as const;

// ---------------------------------------------------------------------------
// Typography — Text decoration
// ---------------------------------------------------------------------------

/** `text-decoration-underline` */
export const classTextDecorationUnderline =
  'text-decoration-underline' as const;
/** `text-decoration-line-through` */
export const classTextDecorationLineThrough =
  'text-decoration-line-through' as const;
/** `text-decoration-none` */
export const classTextDecorationNone = 'text-decoration-none' as const;

// ---------------------------------------------------------------------------
// Typography — Font style
// ---------------------------------------------------------------------------

/** `fst-italic` */
export const classFstItalic = 'fst-italic' as const;
/** `fst-normal` */
export const classFstNormal = 'fst-normal' as const;

// ---------------------------------------------------------------------------
// Typography — Font weight
// ---------------------------------------------------------------------------

/** `fw-bold` */
export const classFwBold = 'fw-bold' as const;
/** `fw-bolder` */
export const classFwBolder = 'fw-bolder' as const;
/** `fw-semibold` */
export const classFwSemibold = 'fw-semibold' as const;
/** `fw-medium` */
export const classFwMedium = 'fw-medium' as const;
/** `fw-normal` */
export const classFwNormal = 'fw-normal' as const;
/** `fw-light` */
export const classFwLight = 'fw-light' as const;
/** `fw-lighter` */
export const classFwLighter = 'fw-lighter' as const;

// ---------------------------------------------------------------------------
// Typography — Font family
// ---------------------------------------------------------------------------

/** `font-monospace` — applies Bootstrap's monospace font stack */
export const classTextMonospace = 'font-monospace' as const;

// ---------------------------------------------------------------------------
// Typography — Line height
// ---------------------------------------------------------------------------

/** `lh-1` */
export const classLh1 = 'lh-1' as const;
/** `lh-sm` */
export const classLhSm = 'lh-sm' as const;
/** `lh-base` */
export const classLhBase = 'lh-base' as const;
/** `lh-lg` */
export const classLhLg = 'lh-lg' as const;

// ---------------------------------------------------------------------------
// Typography — Text reset & muted
// ---------------------------------------------------------------------------

/** `text-reset` — removes inherited color so the element inherits from its parent */
export const classTextReset = 'text-reset' as const;
/** `text-muted` */
export const classTextMuted = 'text-muted' as const;

// ---------------------------------------------------------------------------
// Typography — Visually hidden (accessible hide)
// ---------------------------------------------------------------------------

/** `visually-hidden` — hides element visually while keeping it accessible */
export const classVisuallyHidden = 'visually-hidden' as const;
/** `visually-hidden-focusable` — hidden until focused */
export const classVisuallyHiddenFocusable =
  'visually-hidden-focusable' as const;

// ---------------------------------------------------------------------------
// Text colors (semantic)
// ---------------------------------------------------------------------------

/** `text-primary` */
export const classTextPrimary = 'text-primary' as const;
/** `text-secondary` */
export const classTextSecondary = 'text-secondary' as const;
/** `text-success` */
export const classTextSuccess = 'text-success' as const;
/** `text-danger` */
export const classTextDanger = 'text-danger' as const;
/** `text-warning` */
export const classTextWarning = 'text-warning' as const;
/** `text-info` */
export const classTextInfo = 'text-info' as const;
/** `text-light` */
export const classTextLight = 'text-light' as const;
/** `text-dark` */
export const classTextDark = 'text-dark' as const;
/** `text-body` */
export const classTextBody = 'text-body' as const;
/** `text-black` */
export const classTextBlack = 'text-black' as const;
/** `text-white` */
export const classTextWhite = 'text-white' as const;
/** `text-black-50` */
export const classTextBlack50 = 'text-black-50' as const;
/** `text-white-50` */
export const classTextWhite50 = 'text-white-50' as const;

// ---------------------------------------------------------------------------
// Text opacity
// ---------------------------------------------------------------------------

/** `text-opacity-25` */
export const classTextOpacity25 = 'text-opacity-25' as const;
/** `text-opacity-50` */
export const classTextOpacity50 = 'text-opacity-50' as const;
/** `text-opacity-75` */
export const classTextOpacity75 = 'text-opacity-75' as const;
/** `text-opacity-100` */
export const classTextOpacity100 = 'text-opacity-100' as const;

// ---------------------------------------------------------------------------
// Background colors
// ---------------------------------------------------------------------------

/** `bg-primary` */
export const classBgPrimary = 'bg-primary' as const;
/** `bg-secondary` */
export const classBgSecondary = 'bg-secondary' as const;
/** `bg-success` */
export const classBgSuccess = 'bg-success' as const;
/** `bg-danger` */
export const classBgDanger = 'bg-danger' as const;
/** `bg-warning` */
export const classBgWarning = 'bg-warning' as const;
/** `bg-info` */
export const classBgInfo = 'bg-info' as const;
/** `bg-light` */
export const classBgLight = 'bg-light' as const;
/** `bg-dark` */
export const classBgDark = 'bg-dark' as const;
/** `bg-body` */
export const classBgBody = 'bg-body' as const;
/** `bg-white` */
export const classBgWhite = 'bg-white' as const;
/** `bg-black` */
export const classBgBlack = 'bg-black' as const;
/** `bg-transparent` */
export const classBgTransparent = 'bg-transparent' as const;
/** `bg-gradient` — applies Bootstrap's gradient mixin via CSS variable */
export const classBgGradient = 'bg-gradient' as const;

// ---------------------------------------------------------------------------
// Background opacity
// ---------------------------------------------------------------------------

/** `bg-opacity-10` */
export const classBgOpacity10 = 'bg-opacity-10' as const;
/** `bg-opacity-25` */
export const classBgOpacity25 = 'bg-opacity-25' as const;
/** `bg-opacity-50` */
export const classBgOpacity50 = 'bg-opacity-50' as const;
/** `bg-opacity-75` */
export const classBgOpacity75 = 'bg-opacity-75' as const;
/** `bg-opacity-100` */
export const classBgOpacity100 = 'bg-opacity-100' as const;

// ---------------------------------------------------------------------------
// Border — add / remove
// ---------------------------------------------------------------------------

/** `border` — adds border on all sides */
export const classBorder = 'border' as const;
/** `border-top` */
export const classBorderTop = 'border-top' as const;
/** `border-bottom` */
export const classBorderBottom = 'border-bottom' as const;
/** `border-start` */
export const classBorderStart = 'border-start' as const;
/** `border-end` */
export const classBorderEnd = 'border-end' as const;
/** `border-0` — removes all borders */
export const classBorder0 = 'border-0' as const;
/** `border-top-0` */
export const classBorderTop0 = 'border-top-0' as const;
/** `border-bottom-0` */
export const classBorderBottom0 = 'border-bottom-0' as const;
/** `border-start-0` */
export const classBorderStart0 = 'border-start-0' as const;
/** `border-end-0` */
export const classBorderEnd0 = 'border-end-0' as const;

// ---------------------------------------------------------------------------
// Border — colors
// ---------------------------------------------------------------------------

/** `border-primary` */
export const classBorderPrimary = 'border-primary' as const;
/** `border-secondary` */
export const classBorderSecondary = 'border-secondary' as const;
/** `border-success` */
export const classBorderSuccess = 'border-success' as const;
/** `border-danger` */
export const classBorderDanger = 'border-danger' as const;
/** `border-warning` */
export const classBorderWarning = 'border-warning' as const;
/** `border-info` */
export const classBorderInfo = 'border-info' as const;
/** `border-light` */
export const classBorderLight = 'border-light' as const;
/** `border-dark` */
export const classBorderDark = 'border-dark' as const;
/** `border-white` */
export const classBorderWhite = 'border-white' as const;
/** `border-black` */
export const classBorderBlack = 'border-black' as const;

// ---------------------------------------------------------------------------
// Border — widths
// ---------------------------------------------------------------------------

/** `border-1` */
export const classBorderWidth1 = 'border-1' as const;
/** `border-2` */
export const classBorderWidth2 = 'border-2' as const;
/** `border-3` */
export const classBorderWidth3 = 'border-3' as const;
/** `border-4` */
export const classBorderWidth4 = 'border-4' as const;
/** `border-5` */
export const classBorderWidth5 = 'border-5' as const;

// ---------------------------------------------------------------------------
// Border — opacity
// ---------------------------------------------------------------------------

/** `border-opacity-10` */
export const classBorderOpacity10 = 'border-opacity-10' as const;
/** `border-opacity-25` */
export const classBorderOpacity25 = 'border-opacity-25' as const;
/** `border-opacity-50` */
export const classBorderOpacity50 = 'border-opacity-50' as const;
/** `border-opacity-75` */
export const classBorderOpacity75 = 'border-opacity-75' as const;
/** `border-opacity-100` */
export const classBorderOpacity100 = 'border-opacity-100' as const;

// ---------------------------------------------------------------------------
// Border — rounded corners
// ---------------------------------------------------------------------------

/** `rounded` — default border-radius */
export const classRounded = 'rounded' as const;
/** `rounded-top` */
export const classRoundedTop = 'rounded-top' as const;
/** `rounded-bottom` */
export const classRoundedBottom = 'rounded-bottom' as const;
/** `rounded-start` */
export const classRoundedStart = 'rounded-start' as const;
/** `rounded-end` */
export const classRoundedEnd = 'rounded-end' as const;
/** `rounded-circle` */
export const classRoundedCircle = 'rounded-circle' as const;
/** `rounded-pill` */
export const classRoundedPill = 'rounded-pill' as const;
/** `rounded-0` — removes rounding */
export const classRounded0 = 'rounded-0' as const;
/** `rounded-1` */
export const classRounded1 = 'rounded-1' as const;
/** `rounded-2` */
export const classRounded2 = 'rounded-2' as const;
/** `rounded-3` */
export const classRounded3 = 'rounded-3' as const;
/** `rounded-4` */
export const classRounded4 = 'rounded-4' as const;
/** `rounded-5` */
export const classRounded5 = 'rounded-5' as const;

// ---------------------------------------------------------------------------
// Display utilities
// ---------------------------------------------------------------------------

/** `d-none` */
export const classDNone = 'd-none' as const;
/** `d-inline` */
export const classDInline = 'd-inline' as const;
/** `d-inline-block` */
export const classDInlineBlock = 'd-inline-block' as const;
/** `d-block` */
export const classDBlock = 'd-block' as const;
/** `d-grid` */
export const classDGrid = 'd-grid' as const;
/** `d-inline-grid` */
export const classDInlineGrid = 'd-inline-grid' as const;
/** `d-table` */
export const classDTable = 'd-table' as const;
/** `d-table-row` */
export const classDTableRow = 'd-table-row' as const;
/** `d-table-cell` */
export const classDTableCell = 'd-table-cell' as const;
/** `d-flex` */
export const classDFlex = 'd-flex' as const;
/** `d-inline-flex` */
export const classDInlineFlex = 'd-inline-flex' as const;

// ---------------------------------------------------------------------------
// Flexbox — direction
// ---------------------------------------------------------------------------

/** `flex-row` */
export const classFlexRow = 'flex-row' as const;
/** `flex-row-reverse` */
export const classFlexRowReverse = 'flex-row-reverse' as const;
/** `flex-column` */
export const classFlexColumn = 'flex-column' as const;
/** `flex-column-reverse` */
export const classFlexColumnReverse = 'flex-column-reverse' as const;

// ---------------------------------------------------------------------------
// Flexbox — wrap
// ---------------------------------------------------------------------------

/** `flex-wrap` */
export const classFlexWrap = 'flex-wrap' as const;
/** `flex-nowrap` */
export const classFlexNowrap = 'flex-nowrap' as const;
/** `flex-wrap-reverse` */
export const classFlexWrapReverse = 'flex-wrap-reverse' as const;

// ---------------------------------------------------------------------------
// Flexbox — fill, grow, shrink
// ---------------------------------------------------------------------------

/** `flex-fill` */
export const classFlexFill = 'flex-fill' as const;
/** `flex-grow-0` */
export const classFlexGrow0 = 'flex-grow-0' as const;
/** `flex-grow-1` */
export const classFlexGrow1 = 'flex-grow-1' as const;
/** `flex-shrink-0` */
export const classFlexShrink0 = 'flex-shrink-0' as const;
/** `flex-shrink-1` */
export const classFlexShrink1 = 'flex-shrink-1' as const;

// ---------------------------------------------------------------------------
// Flexbox — justify-content
// ---------------------------------------------------------------------------

/** `justify-content-start` */
export const classJustifyContentStart = 'justify-content-start' as const;
/** `justify-content-end` */
export const classJustifyContentEnd = 'justify-content-end' as const;
/** `justify-content-center` */
export const classJustifyContentCenter = 'justify-content-center' as const;
/** `justify-content-between` */
export const classJustifyContentBetween = 'justify-content-between' as const;
/** `justify-content-around` */
export const classJustifyContentAround = 'justify-content-around' as const;
/** `justify-content-evenly` */
export const classJustifyContentEvenly = 'justify-content-evenly' as const;

// ---------------------------------------------------------------------------
// Flexbox — align-items
// ---------------------------------------------------------------------------

/** `align-items-start` */
export const classAlignItemsStart = 'align-items-start' as const;
/** `align-items-end` */
export const classAlignItemsEnd = 'align-items-end' as const;
/** `align-items-center` */
export const classAlignItemsCenter = 'align-items-center' as const;
/** `align-items-baseline` */
export const classAlignItemsBaseline = 'align-items-baseline' as const;
/** `align-items-stretch` */
export const classAlignItemsStretch = 'align-items-stretch' as const;

// ---------------------------------------------------------------------------
// Flexbox — align-self
// ---------------------------------------------------------------------------

/** `align-self-auto` */
export const classAlignSelfAuto = 'align-self-auto' as const;
/** `align-self-start` */
export const classAlignSelfStart = 'align-self-start' as const;
/** `align-self-end` */
export const classAlignSelfEnd = 'align-self-end' as const;
/** `align-self-center` */
export const classAlignSelfCenter = 'align-self-center' as const;
/** `align-self-baseline` */
export const classAlignSelfBaseline = 'align-self-baseline' as const;
/** `align-self-stretch` */
export const classAlignSelfStretch = 'align-self-stretch' as const;

// ---------------------------------------------------------------------------
// Flexbox — align-content
// ---------------------------------------------------------------------------

/** `align-content-start` */
export const classAlignContentStart = 'align-content-start' as const;
/** `align-content-end` */
export const classAlignContentEnd = 'align-content-end' as const;
/** `align-content-center` */
export const classAlignContentCenter = 'align-content-center' as const;
/** `align-content-between` */
export const classAlignContentBetween = 'align-content-between' as const;
/** `align-content-around` */
export const classAlignContentAround = 'align-content-around' as const;
/** `align-content-stretch` */
export const classAlignContentStretch = 'align-content-stretch' as const;

// ---------------------------------------------------------------------------
// Sizing — width
// ---------------------------------------------------------------------------

/** `w-25` */
export const classW25 = 'w-25' as const;
/** `w-50` */
export const classW50 = 'w-50' as const;
/** `w-75` */
export const classW75 = 'w-75' as const;
/** `w-100` */
export const classW100 = 'w-100' as const;
/** `w-auto` */
export const classWAuto = 'w-auto' as const;
/** `mw-100` — max-width: 100% */
export const classMw100 = 'mw-100' as const;
/** `vw-100` — width: 100vw */
export const classVw100 = 'vw-100' as const;
/** `min-vw-100` — min-width: 100vw */
export const classMinVw100 = 'min-vw-100' as const;

// ---------------------------------------------------------------------------
// Sizing — height
// ---------------------------------------------------------------------------

/** `h-25` */
export const classH25 = 'h-25' as const;
/** `h-50` */
export const classH50 = 'h-50' as const;
/** `h-75` */
export const classH75 = 'h-75' as const;
/** `h-100` */
export const classH100 = 'h-100' as const;
/** `h-auto` */
export const classHAuto = 'h-auto' as const;
/** `mh-100` — max-height: 100% */
export const classMh100 = 'mh-100' as const;
/** `vh-100` — height: 100vh */
export const classVh100 = 'vh-100' as const;
/** `min-vh-100` — min-height: 100vh */
export const classMinVh100 = 'min-vh-100' as const;

// ---------------------------------------------------------------------------
// Spacing — fixed (auto) utilities
// ---------------------------------------------------------------------------

/** `mx-auto` — horizontal auto margins (useful for centering block elements) */
export const classMxAuto = 'mx-auto' as const;
/** `my-auto` — vertical auto margins */
export const classMyAuto = 'my-auto' as const;
/** `ms-auto` — margin-start: auto */
export const classMsAuto = 'ms-auto' as const;
/** `me-auto` — margin-end: auto */
export const classMeAuto = 'me-auto' as const;
/** `mt-auto` — margin-top: auto */
export const classMtAuto = 'mt-auto' as const;
/** `mb-auto` — margin-bottom: auto */
export const classMbAuto = 'mb-auto' as const;
/** `m-auto` — margin: auto on all sides */
export const classMAuto = 'm-auto' as const;

// ---------------------------------------------------------------------------
// Position
// ---------------------------------------------------------------------------

/** `position-static` */
export const classPositionStatic = 'position-static' as const;
/** `position-relative` */
export const classPositionRelative = 'position-relative' as const;
/** `position-absolute` */
export const classPositionAbsolute = 'position-absolute' as const;
/** `position-fixed` */
export const classPositionFixed = 'position-fixed' as const;
/** `position-sticky` */
export const classPositionSticky = 'position-sticky' as const;

/** `top-0` */
export const classTop0 = 'top-0' as const;
/** `top-50` */
export const classTop50 = 'top-50' as const;
/** `top-100` */
export const classTop100 = 'top-100' as const;
/** `bottom-0` */
export const classBottom0 = 'bottom-0' as const;
/** `bottom-50` */
export const classBottom50 = 'bottom-50' as const;
/** `bottom-100` */
export const classBottom100 = 'bottom-100' as const;
/** `start-0` */
export const classStart0 = 'start-0' as const;
/** `start-50` */
export const classStart50 = 'start-50' as const;
/** `start-100` */
export const classStart100 = 'start-100' as const;
/** `end-0` */
export const classEnd0 = 'end-0' as const;
/** `end-50` */
export const classEnd50 = 'end-50' as const;
/** `end-100` */
export const classEnd100 = 'end-100' as const;

/** `translate-middle` — centers an absolutely-positioned element */
export const classTranslateMiddle = 'translate-middle' as const;
/** `translate-middle-x` */
export const classTranslateMiddleX = 'translate-middle-x' as const;
/** `translate-middle-y` */
export const classTranslateMiddleY = 'translate-middle-y' as const;

// ---------------------------------------------------------------------------
// Overflow
// ---------------------------------------------------------------------------

/** `overflow-auto` */
export const classOverflowAuto = 'overflow-auto' as const;
/** `overflow-hidden` */
export const classOverflowHidden = 'overflow-hidden' as const;
/** `overflow-visible` */
export const classOverflowVisible = 'overflow-visible' as const;
/** `overflow-scroll` */
export const classOverflowScroll = 'overflow-scroll' as const;
/** `overflow-x-auto` */
export const classOverflowXAuto = 'overflow-x-auto' as const;
/** `overflow-x-hidden` */
export const classOverflowXHidden = 'overflow-x-hidden' as const;
/** `overflow-x-visible` */
export const classOverflowXVisible = 'overflow-x-visible' as const;
/** `overflow-x-scroll` */
export const classOverflowXScroll = 'overflow-x-scroll' as const;
/** `overflow-y-auto` */
export const classOverflowYAuto = 'overflow-y-auto' as const;
/** `overflow-y-hidden` */
export const classOverflowYHidden = 'overflow-y-hidden' as const;
/** `overflow-y-visible` */
export const classOverflowYVisible = 'overflow-y-visible' as const;
/** `overflow-y-scroll` */
export const classOverflowYScroll = 'overflow-y-scroll' as const;

// ---------------------------------------------------------------------------
// Visibility
// ---------------------------------------------------------------------------

/** `visible` */
export const classVisible = 'visible' as const;
/** `invisible` */
export const classInvisible = 'invisible' as const;

// ---------------------------------------------------------------------------
// Opacity
// ---------------------------------------------------------------------------

/** `opacity-0` */
export const classOpacity0 = 'opacity-0' as const;
/** `opacity-25` */
export const classOpacity25 = 'opacity-25' as const;
/** `opacity-50` */
export const classOpacity50 = 'opacity-50' as const;
/** `opacity-75` */
export const classOpacity75 = 'opacity-75' as const;
/** `opacity-100` */
export const classOpacity100 = 'opacity-100' as const;

// ---------------------------------------------------------------------------
// Shadow
// ---------------------------------------------------------------------------

/** `shadow` — medium shadow */
export const classShadow = 'shadow' as const;
/** `shadow-sm` — small shadow */
export const classShadowSm = 'shadow-sm' as const;
/** `shadow-lg` — large shadow */
export const classShadowLg = 'shadow-lg' as const;
/** `shadow-none` — removes shadow */
export const classShadowNone = 'shadow-none' as const;

// ---------------------------------------------------------------------------
// Float
// ---------------------------------------------------------------------------

/** `float-start` */
export const classFloatStart = 'float-start' as const;
/** `float-end` */
export const classFloatEnd = 'float-end' as const;
/** `float-none` */
export const classFloatNone = 'float-none' as const;

// ---------------------------------------------------------------------------
// Clearfix
// ---------------------------------------------------------------------------

/** `clearfix` */
export const classClearfix = 'clearfix' as const;

// ---------------------------------------------------------------------------
// Stretched link
// ---------------------------------------------------------------------------

/** `stretched-link` — makes the containing positioned element the click target */
export const classStretchedLink = 'stretched-link' as const;

// ---------------------------------------------------------------------------
// User interaction
// ---------------------------------------------------------------------------

/** `user-select-all` */
export const classUserSelectAll = 'user-select-all' as const;
/** `user-select-auto` */
export const classUserSelectAuto = 'user-select-auto' as const;
/** `user-select-none` */
export const classUserSelectNone = 'user-select-none' as const;

/** `pe-none` — pointer-events: none */
export const classPeNone = 'pe-none' as const;
/** `pe-auto` — pointer-events: auto */
export const classPeAuto = 'pe-auto' as const;

// ---------------------------------------------------------------------------
// Object fit
// ---------------------------------------------------------------------------

/** `object-fit-contain` */
export const classObjectFitContain = 'object-fit-contain' as const;
/** `object-fit-cover` */
export const classObjectFitCover = 'object-fit-cover' as const;
/** `object-fit-fill` */
export const classObjectFitFill = 'object-fit-fill' as const;
/** `object-fit-scale` — object-fit: scale-down */
export const classObjectFitScale = 'object-fit-scale' as const;
/** `object-fit-none` */
export const classObjectFitNone = 'object-fit-none' as const;

// ---------------------------------------------------------------------------
// Z-index
// ---------------------------------------------------------------------------

/** `z-n1` — z-index: -1 */
export const classZN1 = 'z-n1' as const;
/** `z-0` */
export const classZ0 = 'z-0' as const;
/** `z-1` */
export const classZ1 = 'z-1' as const;
/** `z-2` */
export const classZ2 = 'z-2' as const;
/** `z-3` */
export const classZ3 = 'z-3' as const;

// ---------------------------------------------------------------------------
// Focus ring
// ---------------------------------------------------------------------------

/** `focus-ring` — applies Bootstrap's focus ring styles */
export const classFocusRing = 'focus-ring' as const;

// ---------------------------------------------------------------------------
// Link color utilities
// ---------------------------------------------------------------------------

/** `link-primary` */
export const classLinkPrimary = 'link-primary' as const;
/** `link-secondary` */
export const classLinkSecondary = 'link-secondary' as const;
/** `link-success` */
export const classLinkSuccess = 'link-success' as const;
/** `link-danger` */
export const classLinkDanger = 'link-danger' as const;
/** `link-warning` */
export const classLinkWarning = 'link-warning' as const;
/** `link-info` */
export const classLinkInfo = 'link-info' as const;
/** `link-light` */
export const classLinkLight = 'link-light' as const;
/** `link-dark` */
export const classLinkDark = 'link-dark' as const;

// ---------------------------------------------------------------------------
// Link underline / decoration utilities (Bootstrap ≥ 5.3)
// ---------------------------------------------------------------------------

/** `link-underline` */
export const classLinkUnderline = 'link-underline' as const;
/** `link-underline-primary` */
export const classLinkUnderlinePrimary = 'link-underline-primary' as const;
/** `link-underline-secondary` */
export const classLinkUnderlineSecondary = 'link-underline-secondary' as const;
/** `link-underline-success` */
export const classLinkUnderlineSuccess = 'link-underline-success' as const;
/** `link-underline-danger` */
export const classLinkUnderlineDanger = 'link-underline-danger' as const;
/** `link-underline-warning` */
export const classLinkUnderlineWarning = 'link-underline-warning' as const;
/** `link-underline-info` */
export const classLinkUnderlineInfo = 'link-underline-info' as const;
/** `link-underline-light` */
export const classLinkUnderlineLight = 'link-underline-light' as const;
/** `link-underline-dark` */
export const classLinkUnderlineDark = 'link-underline-dark' as const;

// ---------------------------------------------------------------------------
// Print display utilities
// ---------------------------------------------------------------------------

/** `d-print-none` */
export const classDPrintNone = 'd-print-none' as const;
/** `d-print-inline` */
export const classDPrintInline = 'd-print-inline' as const;
/** `d-print-inline-block` */
export const classDPrintInlineBlock = 'd-print-inline-block' as const;
/** `d-print-block` */
export const classDPrintBlock = 'd-print-block' as const;
/** `d-print-grid` */
export const classDPrintGrid = 'd-print-grid' as const;
/** `d-print-table` */
export const classDPrintTable = 'd-print-table' as const;
/** `d-print-table-row` */
export const classDPrintTableRow = 'd-print-table-row' as const;
/** `d-print-table-cell` */
export const classDPrintTableCell = 'd-print-table-cell' as const;
/** `d-print-flex` */
export const classDPrintFlex = 'd-print-flex' as const;
/** `d-print-inline-flex` */
export const classDPrintInlineFlex = 'd-print-inline-flex' as const;
