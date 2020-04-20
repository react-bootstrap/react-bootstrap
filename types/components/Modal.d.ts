import * as React from 'react';
import * as BaseModal from 'react-overlays/Modal';

import ModalBody from './ModalBody';
import ModalDialog from './ModalDialog';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';

import { BsPrefixComponent } from './helpers';

export interface ModalProps
  extends Omit<
    BaseModal.ModalProps,
    | 'role'
    | 'renderBackdrop'
    | 'renderDialog'
    | 'transition'
    | 'backdropTransition'
  > {
  size?: 'sm' | 'lg' | 'xl';
  centered?: boolean;
  backdropClassName?: string;
  animation?: boolean;
  dialogClassName?: string;
  dialogAs?: React.ElementType;
  scrollable?: boolean;
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
