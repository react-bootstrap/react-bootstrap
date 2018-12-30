import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class CardGroup<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export default CardGroup;
