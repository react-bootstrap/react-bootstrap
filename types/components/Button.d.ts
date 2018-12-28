import * as React from 'react';

import { ReplaceProps } from './helpers';

declare namespace Button {
  interface ButtonProps<TRendered extends React.ReactType> {
    as?: TRendered;
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
}

declare class Button<
  TRendered extends React.ReactType = 'button'
> extends React.Component<
  ReplaceProps<TRendered, Button.ButtonProps<TRendered>>
> {}

export default Button;
