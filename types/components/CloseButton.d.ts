import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface CloseButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<CloseButton>;
}

declare class CloseButton extends React.Component<CloseButtonProps> {}

export default CloseButton;
