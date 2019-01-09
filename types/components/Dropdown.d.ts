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

export interface DropdownProps extends React.HTMLProps<Dropdown> {
  drop?: 'up' | 'left' | 'right' | 'down';
  alightRight?: boolean;
  show?: boolean;
  flip?: boolean;
  onToggle?: (
    isOpen: boolean,
    event: React.SyntheticEvent<Dropdown>,
    metadata: { source: 'select' | 'click' | 'rootClose' | 'keydown' },
  ) => void;
  onSelect?: SelectCallback;
}

declare class Dropdown extends React.Component<DropdownProps> {
  public static Toggle: typeof DropdownToggle;
  public static Menu: typeof DropdownMenu;
  public static Item: typeof DropdownItem;
  public static Divider: typeof DropdownDivider;
  public static Header: typeof DropdownHeader;
}

export default Dropdown;
