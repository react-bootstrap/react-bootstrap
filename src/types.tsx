import PropTypes from 'prop-types';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | string;
export type ButtonVariant =
  | Variant
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark'
  | 'outline-light';
export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'white'
  | 'muted';

export type Placement = import('react-overlays/usePopper').Placement;

export type ArrowProps = {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
};

export type EventKey = string | number;

export type AlignDirection = 'start' | 'end';

export type ResponsiveAlignProp =
  | { sm: AlignDirection }
  | { md: AlignDirection }
  | { lg: AlignDirection }
  | { xl: AlignDirection }
  | { xxl: AlignDirection };

export type AlignType = AlignDirection | ResponsiveAlignProp;

const alignDirection = PropTypes.oneOf<AlignDirection>(['start', 'end']);

export const alignPropType = PropTypes.oneOfType([
  alignDirection,
  PropTypes.shape({ sm: alignDirection }),
  PropTypes.shape({ md: alignDirection }),
  PropTypes.shape({ lg: alignDirection }),
  PropTypes.shape({ xl: alignDirection }),
  PropTypes.shape({ xxl: alignDirection }),
]);

export type RootCloseEvent = 'click' | 'mousedown';
