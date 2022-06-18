import PropTypes from 'prop-types';
import { State } from '@restart/ui/usePopper';

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

export type Placement = import('@restart/ui/usePopper').Placement;

export type AlignDirection = 'start' | 'end';

export type ResponsiveAlignProp =
  | { sm: AlignDirection }
  | { md: AlignDirection }
  | { lg: AlignDirection }
  | { xl: AlignDirection }
  | { xxl: AlignDirection }
  | Record<string, AlignDirection>;

export type AlignType = AlignDirection | ResponsiveAlignProp;

const alignDirection = PropTypes.oneOf<AlignDirection>(['start', 'end']);

export const alignPropType = PropTypes.oneOfType([
  alignDirection,
  PropTypes.shape({ sm: alignDirection }),
  PropTypes.shape({ md: alignDirection }),
  PropTypes.shape({ lg: alignDirection }),
  PropTypes.shape({ xl: alignDirection }),
  PropTypes.shape({ xxl: alignDirection }),
  PropTypes.object,
]);

export type RootCloseEvent = 'click' | 'mousedown';

export type GapValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface PopperRef {
  state: State | undefined;
  outOfBoundaries: boolean;
  placement: Placement | undefined;
  scheduleUpdate?: () => void;
}
