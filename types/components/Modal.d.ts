import * as React from 'react';

import ModalBody from './ModalBody';
import ModalDialog from './ModalDialog';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';

import { BsPrefixComponent, TransitionCallbacks } from './helpers';

export interface ModalProps extends TransitionCallbacks {
  size?: 'sm' | 'lg' | 'xl';
  centered?: boolean;
  backdrop?: 'static' | boolean;
  backdropClassName?: string;
  keyboard?: boolean;
  animation?: boolean;
  dialogClassName?: string;
  dialogAs?: React.ElementType;
  autoFocus?: boolean;
  enforceFocus?: boolean;
  restoreFocus?: boolean;
  show?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  container?: any;
  scrollable?: boolean;
  onEscapeKeyDown?: () => void;
}

declare class Modal<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, ModalProps> {
  static Body: typeof ModalBody;
  static Header: typeof ModalHeader;
  static Title: typeof ModalTitle;
  static Footer: typeof ModalFooter;

  static Dialog: typeof ModalDialog;
}

export default Modal;
