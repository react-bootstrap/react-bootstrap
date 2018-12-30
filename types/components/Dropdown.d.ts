import * as React from 'react';
import { SelectCallback } from './helpers';

import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';

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
}

export default Dropdown;
