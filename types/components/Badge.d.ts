import * as React from 'react';

export interface BadgeProps extends React.HTMLProps<HTMLSpanElement> {
  bsPrefix?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  pill?: boolean;
}

declare const Badge: React.ForwardRefExoticComponent<BadgeProps>;

export default Badge;
