import * as React from 'react';

import Button, { ButtonProps } from './Button';

import { BsPrefixComponent, BsPrefixComponentClass } from './helpers';

export interface ToggleButtonProps {
  type?: 'checkbox' | 'radio';
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<this>;
  value: unknown;
  inputRef?: React.LegacyRef<this>;
}

declare class ToggleButton<
  // Need to use BsPrefixComponentClass to get proper type checking.
  As extends React.ElementType = BsPrefixComponentClass<'button', ButtonProps>
> extends BsPrefixComponent<As, ToggleButtonProps> {}

export default ToggleButton;
