import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ButtonGroupProps {
  role?: string;
  size?: 'sm' | 'lg';
  toggle?: boolean;
  vertical?: boolean;
}

declare class ButtonGroup<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, ButtonGroupProps> {}

export default ButtonGroup;
