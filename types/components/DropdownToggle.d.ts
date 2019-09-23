import * as React from 'react';

import Button, { ButtonVariant, ButtonSize } from './Button';

import { BsPrefixComponent } from './helpers';

export interface DropdownToggleProps {
  id: string;
  split?: boolean;
  childBsPrefix?: string;

  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

declare class DropdownToggle extends BsPrefixComponent<typeof Button, DropdownToggleProps> {}

export default DropdownToggle;
