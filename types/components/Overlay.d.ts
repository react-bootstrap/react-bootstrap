import * as React from 'react';
import * as BaseOverlay from 'react-overlays/Overlay';

export type Placement = import('react-overlays/usePopper').Placement;

export interface OverlayInjectedProps {
  ref: (instance: HTMLElement) => void;
  style: React.CSSProperties;
  'aria-labelledby'?: string;

  arrowProps: { ref: any; style: object };

  show: boolean;
  popper: {
    state: any;
    outOfBoundaries: boolean;
    placement: Placement;
    scheduleUpdate: () => void;
  };
  [prop: string]: any;
}

export type OverlayChildren =
  | React.ReactElement<OverlayInjectedProps>
  | ((injected: OverlayInjectedProps) => React.ReactNode);

export interface OverlayProps
  extends Omit<BaseOverlay.OverlayProps, 'children' | 'transition'> {
  children: OverlayChildren;
  transition?: boolean | BaseOverlay.OverlayProps['transition'];
  placement?: Placement;
}

declare const Overlay: React.FunctionComponent<OverlayProps>;

export default Overlay;
