import * as React from 'react';

import { Placement } from './Overlay';
import PopoverContent from './PopoverContent';
import PopoverTitle from './PopoverTitle';

export interface PopoverProps extends React.ComponentPropsWithoutRef<'div'> {
  bsPrefix?: string;
  id: string;
  placement?: Placement;
  title?: string;
  arrowProps?: { ref: any; style: object };
  content?: boolean;
}

declare interface Popover
  extends React.ForwardRefRenderFunction<HTMLDivElement, PopoverProps> {
  Title: typeof PopoverTitle;
  Content: typeof PopoverContent;
}

declare const Popover: Popover;

export default Popover;
