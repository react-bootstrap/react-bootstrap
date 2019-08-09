import * as React from 'react';

import Button from './Button';

import { BsPrefixComponent } from './helpers';

export interface DropdownToggleProps {
  id: string;
  split?: boolean;
  childBsPrefix?: string;
}

declare class DropdownToggle<
  As extends React.ElementType = typeof Button
> extends BsPrefixComponent<As, DropdownToggleProps> {}

export default DropdownToggle;
