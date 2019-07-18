import * as React from 'react';

import { Placement } from './Overlay';

import { BsPrefixComponent } from './helpers';
import PopoverContent from './PopoverContent';
import PopoverTitle from './PopoverTitle';

export interface PopoverProps {
  id: string | number;
  placement?: Placement;
  title?: React.ReactNode;
  arrowProps?: { ref: any; style: object };
}

declare class Popover extends BsPrefixComponent<'div', PopoverProps> {
  static Title: typeof PopoverTitle;
  static Content: typeof PopoverContent;
}

export default Popover;
