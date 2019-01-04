import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface ModalDialogProps {
  size?: 'sm' | 'lg';
  centered?: boolean;
}

declare class ModalDialog extends BsPrefixComponent<'div', ModalDialogProps> {}

export default ModalDialog;
