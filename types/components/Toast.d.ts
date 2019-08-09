import * as React from 'react';

import ToastBody from './ToastBody';
import ToastHeader from './ToastHeader';

import { BsPrefixComponent, TransitionCallbacks } from './helpers';

export interface ToastProps extends TransitionCallbacks {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
  onClose?: () => void;
  show: boolean;
  transition: boolean | React.ElementType;
}

declare class Toast extends BsPrefixComponent<'div', ToastProps> {
  static Body: typeof ToastBody;
  static Header: typeof ToastHeader;
}

export default Toast;
