import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ButtonProps {
  active?: boolean;
  block?: boolean;
  variant?:
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
  size?: 'sm' | 'lg';
  type?: 'button' | 'reset' | 'submit';
  href?: string;
  disabled?: boolean;
}

declare class Button<
  As extends React.ReactType = 'button'
> extends BsPrefixComponent<As, ButtonProps> {}

export default Button;
