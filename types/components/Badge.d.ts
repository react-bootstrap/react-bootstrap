import * as React from 'react';

declare namespace Badge {
  export interface BadgeProps extends React.HTMLProps<Badge> {
    bsPrefix?: string;
    variant?:
      | string
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
}
declare class Badge extends React.Component<Badge.BadgeProps> {}

export default Badge;
