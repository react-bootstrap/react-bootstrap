import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ToastHeaderProps {
  closeLabel?: string;
  closeButton?: boolean;
}

declare class ToastHeader extends BsPrefixComponent<'div', ToastHeaderProps> {}

export default ToastHeader;
