import * as React from 'react';

interface BadgeProps extends React.HTMLProps<Badge> {
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

declare class Badge extends React.Component<BadgeProps> {}

export default Badge;
