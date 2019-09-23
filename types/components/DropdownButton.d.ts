import * as React from 'react';

import Dropdown from './Dropdown';
import DropdownToggle from './DropdownToggle';

import { BsPrefixComponent } from './helpers';
import { ButtonVariant, ButtonSize } from './Button';

export interface DropdownButtonProps {
  id: string;
  title: React.ReactNode;
  menuRole?: string;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;

  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

declare class DropdownButton extends BsPrefixComponent<'button', DropdownButtonProps> {}

export default DropdownButton;
