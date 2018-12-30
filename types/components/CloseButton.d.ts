import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface CloseButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<CloseButton>;
}

declare class CloseButton extends React.Component<CloseButtonProps> {}

export default CloseButton;
