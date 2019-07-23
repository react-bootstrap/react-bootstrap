import * as React from 'react';

import Button from './Button';

import { BsPrefixComponent } from './helpers';

export interface DropdownToggleProps
  extends React.ComponentPropsWithRef<typeof Button> {
  id: string;
  split?: boolean;
  childBsPrefix?: string;
}

declare class DropdownToggle<
  As extends React.ReactType = typeof Button
> extends BsPrefixComponent<As, DropdownToggleProps> {}

export default DropdownToggle;
