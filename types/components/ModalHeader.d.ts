import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ModalHeaderProps {
  closeLabel?: string;
  closeButton?: boolean;
  onHide?: () => void;
}

declare class ModalHeader<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, ModalHeaderProps> {}

export default ModalHeader;
