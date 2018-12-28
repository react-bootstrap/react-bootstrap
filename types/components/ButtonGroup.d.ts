import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface ButtonGroupProps {
  role?: string;
  size?: 'sm' | 'lg' | string;
  toggle?: boolean;
  vertical?: boolean;
}

declare class ButtonGroup<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, ButtonGroupProps> {}

export default ButtonGroup;
