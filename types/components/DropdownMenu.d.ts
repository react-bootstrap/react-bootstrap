import * as React from 'react';

import { BsPrefixComponent, SelectCallback } from './helpers';

interface DropdownMenuProps {
  show?: true;
  flip?: true;
  alightRight?: true;
  onSelect?: SelectCallback;
  rootCloseEvent?: 'click' | 'mousedown';
  popperConfig?: object;
}

declare class DropdownMenu<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, DropdownMenuProps> {}

export default DropdownMenu;
