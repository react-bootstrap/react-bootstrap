import * as React from 'react';

import { OverlayChildren, OverlayProps } from './Overlay';

type TriggerType = 'hover' | 'click' | 'focus';

export interface OverlayTriggerProps extends Omit<OverlayProps, 'children'> {
  children: React.ReactNode;
  trigger?: TriggerType | TriggerType[];
  delay?: number | { show: number; hide: number };
  defaultShow?: boolean;
  flip?: boolean;
  overlay: OverlayChildren;

  target?: never;
  onHide?: never;
  show?: never;
}

declare class OverlayTrigger extends React.Component<OverlayTriggerProps> {}

export default OverlayTrigger;
