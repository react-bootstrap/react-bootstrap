import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ModalDialogProps {
  size?: 'sm' | 'lg';
  centered?: boolean;
  scrollable?: boolean;
}

declare class ModalDialog extends BsPrefixComponent<'div', ModalDialogProps> {}

export default ModalDialog;
