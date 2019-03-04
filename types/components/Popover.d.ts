import * as React from 'react';

import { Placement } from './Overlay';

import { BsPrefixComponent } from './helpers';

export interface PopoverProps {
  id: string | number;
  placement?: Placement;
  title?: React.ReactNode;
  arrowProps?: { ref: any; style: object };
}

declare class Popover extends BsPrefixComponent<'div', PopoverProps> {}

export default Popover;
