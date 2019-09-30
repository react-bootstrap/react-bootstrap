import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface SpinnerProps {
  animation: 'border' | 'grow';
  role?: string;
  size?: 'sm';
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  bsPrefix?: string;
}

declare class Spinner<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, SpinnerProps> {}

export default Spinner;
