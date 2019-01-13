import * as React from 'react';

import { TransitionCallbacks } from './helpers';

type ComponentOrElement = React.ReactInstance | Node;
export type Placement =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';

interface OverlayProps extends TransitionCallbacks {
  container?: ComponentOrElement | ((props: object) => ComponentOrElement);
  target?: ComponentOrElement | ((props: object) => ComponentOrElement);
  show?: boolean;
  popperConfig?: object;
  rootClose?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  onHide?: () => void;
  transition?: boolean | React.ReactType;
  placement?: Placement;
}

declare class Overlay extends React.Component<OverlayProps> {}

export default Overlay;
