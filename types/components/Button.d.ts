import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark'
  | 'outline-light';

export type ButtonSize = 'sm' | 'lg';
export type ButtonType = 'button' | 'reset' | 'submit';

export interface ButtonProps {
  active?: boolean;
  block?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  href?: string;
  disabled?: boolean;
}

declare class Button extends BsPrefixComponent<'button', ButtonProps> {}

export default Button;
