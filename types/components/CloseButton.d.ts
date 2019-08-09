import * as React from 'react';

export interface CloseButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<CloseButton>;
}

declare class CloseButton extends React.Component<CloseButtonProps> {}

export default CloseButton;
