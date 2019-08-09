import * as React from 'react';

import Button from './Button';

import { BsPrefixComponent } from './helpers';

export interface ToggleButtonProps {
  type?: 'checkbox' | 'radio';
  name?: string;
  checked?: boolean;
  diabled?: boolean;
  onChange?: React.ChangeEventHandler<this>;
  value: unknown;
  inputRef?: React.LegacyRef<this>;
  innerRef?: React.LegacyRef<this>;
}

declare class ToggleButton<
  As extends React.ElementType = typeof Button
> extends BsPrefixComponent<As, ToggleButtonProps> {}

export default ToggleButton;
