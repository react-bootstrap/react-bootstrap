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

declare class DropdownItem extends BsPrefixComponent<typeof SafeAnchor, DropdownItemProps> {}

export default DropdownItem;
