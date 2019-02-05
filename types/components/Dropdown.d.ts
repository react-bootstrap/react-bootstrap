import * as React from 'react';
import { BsPrefixComponent, SelectCallback } from './helpers';

import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';

declare class DropdownDivider<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class DropdownHeader<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export interface DropdownProps {
  drop?: 'up' | 'left' | 'right' | 'down';
  alignRight?: boolean;
  show?: boolean;
  flip?: boolean;
  onToggle?: (
    isOpen: boolean,
    event: React.SyntheticEvent<Dropdown>,
    metadata: { source: 'select' | 'click' | 'rootClose' | 'keydown' },
  ) => void;
  onSelect?: SelectCallback;
}

declare class Dropdown<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, DropdownProps> {
  static Toggle: typeof DropdownToggle;
  static Menu: typeof DropdownMenu;
  static Item: typeof DropdownItem;
  static Divider: typeof DropdownDivider;
  static Header: typeof DropdownHeader;
}

export default Dropdown;
