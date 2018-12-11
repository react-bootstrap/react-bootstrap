import * as React from 'react';

import { ElementType, WithInnerProps, BootstrapProps } from './ThemeProvider';

interface ButtonProps<TRendered extends ElementType> {
  as: TRendered;
  active?: boolean;
  block?: boolean;
  variant?:
    | string
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
  size?: 'sm' | 'lg' | string;
  disabled?: boolean;
}

declare class Button<
  TRendered extends ElementType = 'button'
> extends React.Component<WithInnerProps<TRendered, ButtonProps<TRendered>>> {
  static defaultProps: { as: TRendered } = { as: 'button' };
}

export default Button;
