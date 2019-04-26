import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ToastDialogProps {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
  onClose?: () => void;
  show: boolean;
  transition: boolean | React.ElementType,
}

declare class ToastDialog extends BsPrefixComponent<'div', ToastDialogProps> { }

export default ToastDialog;
