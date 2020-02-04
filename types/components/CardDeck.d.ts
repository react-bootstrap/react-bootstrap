import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class CardDeck<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export default CardDeck;
