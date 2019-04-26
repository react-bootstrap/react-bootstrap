import * as React from 'react';

import ToastBody from './ToastBody';
import ToastHeader from './ToastHeader';
import ToastDialog from './ToastDialog';

import {
  BsPrefixComponent,
  SelectCallback,
  TransitionCallbacks,
} from './helpers';

export interface ToastProps extends TransitionCallbacks {
  animation?: boolean;
  dialogAs?: React.ReactType;
  autohide?: boolean;
  delay?: number;
  onClose?: () => void;
  show: boolean;
  transition: boolean | React.ElementType,
}

declare class Toast<
  As extends React.ReactType = 'div'
  > extends BsPrefixComponent<As, ToastProps> {
  static Body: typeof ToastBody;
  static Header: typeof ToastHeader;

  static Dialog: typeof ToastDialog;
}

export default Toast;
