import * as React from 'react';

import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent, SelectCallback } from './helpers';

export interface DropdownItemProps {
  active?: boolean;
  disabled?: boolean;
  eventKey?: string;
  href?: string;
  onClick?: React.MouseEventHandler<this>;
  onSelect?: SelectCallback;
}

declare class DropdownItem<
  As extends React.ElementType = typeof SafeAnchor
> extends BsPrefixComponent<As, DropdownItemProps> {}

export default DropdownItem;
