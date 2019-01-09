import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ModalHeaderProps {
  closeLabel?: string;
  closeButton?: boolean;
  onHide?: () => void;
}

declare class ModalHeader<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, ModalHeaderProps> {}

export default ModalHeader;
