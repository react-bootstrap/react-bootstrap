import * as React from 'react';

import DropdownToggle from './DropdownToggle';
import Dropdown from './Dropdown';

import { ReplaceProps, BsPrefixComponent } from './helpers';
import { ButtonVariant, ButtonSize } from './Button';

export interface SplitButtonProps  {
  id: string | number;
  toggleLabel?: string;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<this>;
  title: React.ReactNode;
  menuRole?: string;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;

  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

declare class SplitButton extends BsPrefixComponent<'div', SplitButtonProps> {}

export default SplitButton;
