import * as React from 'react';

import { BsPrefixComponent, SelectCallback } from './helpers';

export interface DropdownMenuProps {
  show?: boolean;
  renderOnMount?: boolean;
  flip?: boolean;
  alignRight?: boolean;
  onSelect?: SelectCallback;
  rootCloseEvent?: 'click' | 'mousedown';
  popperConfig?: object;
}

declare class DropdownMenu<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, DropdownMenuProps> {}

export default DropdownMenu;
