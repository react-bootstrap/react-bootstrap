import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class PopoverTitle<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export default PopoverTitle;
