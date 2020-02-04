import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ToastHeaderProps {
  closeLabel?: string;
  closeButton?: boolean;
}

declare class ToastHeader<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, ToastHeaderProps> {}

export default ToastHeader;
