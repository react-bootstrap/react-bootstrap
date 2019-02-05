import * as React from 'react';

import { Placement } from './Overlay';

import { BsPrefixComponent } from './helpers';

export interface TooltipProps {
  id: string | number;
  placement?: Placement;
  arrowProps?: { ref: any; style: object };
}

declare class Tooltip extends BsPrefixComponent<'div', TooltipProps> {}

export default Tooltip;
