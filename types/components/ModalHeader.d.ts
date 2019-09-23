import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ModalHeaderProps {
  closeLabel?: string;
  closeButton?: boolean;
  onHide?: () => void;
}

declare class ModalHeader extends BsPrefixComponent<'div', ModalHeaderProps> {}

export default ModalHeader;
