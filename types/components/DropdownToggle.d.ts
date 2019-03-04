import * as React from 'react';

import Button from './Button';

import { BsPrefixComponent, PropsOf } from './helpers';

export interface DropdownToggleProps extends PropsOf<typeof Button> {
  id: string;
  split?: boolean;
  childBsPrefix?: string;
}

declare class DropdownToggle<
  As extends React.ReactType = typeof Button
> extends BsPrefixComponent<As, DropdownToggleProps> {}

export default DropdownToggle;
