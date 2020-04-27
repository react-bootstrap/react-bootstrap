import * as React from 'react';
import * as BaseModal from 'react-overlays/Modal';

import ModalBody from './ModalBody';
import ModalDialog from './ModalDialog';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';

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
  bsPrefix?: string;
  centered?: boolean;
  backdropClassName?: string;
  animation?: boolean;
  dialogClassName?: string;
  dialogAs?: React.ElementType;
  scrollable?: boolean;
}

declare type Modal = React.ComponentClass<ModalProps> & {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Footer: typeof ModalFooter;

  Dialog: typeof ModalDialog;
};

declare const Modal: Modal;
export default Modal;
