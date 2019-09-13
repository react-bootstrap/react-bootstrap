import * as React from 'react';

import { Placement } from './Overlay';
import PopoverContent from './PopoverContent';
import PopoverTitle from './PopoverTitle';

import { BsPrefixComponent } from './helpers';

export interface PopoverProps {
  id: string | number;
  placement?: Placement;
  title?: React.ReactNode;
  arrowProps?: { ref: any; style: object };
  content?: boolean;
}

declare class Popover extends BsPrefixComponent<'div', PopoverProps> {
  static Title: typeof PopoverTitle;
  static Content: typeof PopoverContent;
}

export default Popover;
