import * as React from 'react';
import { BsPrefixComponent } from './helpers';

export interface BadgeProps {
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

declare class Badge<
  As extends React.ElementType = 'span'
> extends BsPrefixComponent<As, BadgeProps> {}

export default Badge;
