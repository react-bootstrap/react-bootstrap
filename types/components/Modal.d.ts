import * as React from 'react';

import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import ModalDialog from './ModalDialog';

import {
  BsPrefixComponent,
  SelectCallback,
  TransitionCallbacks,
} from './helpers';

declare interface ModalProps extends TransitionCallbacks {
  size?: 'sm' | 'lg';
  centered?: boolean;
  backdrop?: 'static' | boolean;
  backdropClassName?: string;
  keyboard?: boolean;
  animation?: boolean;
  dialogClassName?: string;
  dialogAs?: React.ReactType;
  autoFocus?: boolean;
  enforceFocus?: boolean;
  restoreFocus?: boolean;
  show?: boolean;
  onHide?: () => void;
  container?: any;
}

declare class Modal<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, ModalProps> {
  public static Body: typeof ModalBody;
  public static Header: typeof ModalHeader;
  public static Title: typeof ModalTitle;
  public static Footer: typeof ModalFooter;

  public static Dialog: typeof ModalDialog;
}

export default Modal;
