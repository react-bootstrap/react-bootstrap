import * as React from 'react';

import Button, { ButtonProps } from './Button';

import { BsPrefixComponent, BsPrefixComponentClass } from './helpers';

export interface DropdownToggleProps {
  id: string;
  split?: boolean;
  childBsPrefix?: string;
}

declare class DropdownToggle<
  As extends React.ElementType = BsPrefixComponentClass<'button', ButtonProps>
> extends BsPrefixComponent<As, DropdownToggleProps> {}

export default DropdownToggle;
