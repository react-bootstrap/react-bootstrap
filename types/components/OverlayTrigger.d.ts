import * as React from 'react';

import Overlay from './Overlay';

import { PropsOf } from './helpers';

type TriggerType = 'hover' | 'click' | 'focus';

export interface OverlayTriggerProps extends PropsOf<typeof Overlay> {
  children: React.ReactNode;
  trigger?: TriggerType | TriggerType[];
  delay?: number | { show: number; hide: number };
  defaultShow?: boolean;
  overlay: React.ReactNode | (() => React.ReactNode);
  target?: never;
  onHide?: never;
  show?: never;
}

declare class OverlayTrigger extends React.Component<OverlayTriggerProps> {}

export default OverlayTrigger;
