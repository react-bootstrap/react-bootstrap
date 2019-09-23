import * as React from 'react';

import { BsPrefixComponent, SelectCallback } from './helpers';

export interface DropdownMenuProps {
  show?: boolean;
  flip?: boolean;
  alignRight?: boolean;
  onSelect?: SelectCallback;
  rootCloseEvent?: 'click' | 'mousedown';
  popperConfig?: object;
}

declare class DropdownMenu extends BsPrefixComponent<'div', DropdownMenuProps> {}

export default DropdownMenu;
