import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ButtonGroupProps {
  role?: string;
  size?: 'sm' | 'lg';
  toggle?: boolean;
  vertical?: boolean;
}

declare class ButtonGroup<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, ButtonGroupProps> {}

export default ButtonGroup;
