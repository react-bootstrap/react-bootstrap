import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface CardImgProps {
  variant?: 'top' | 'bottom';
}

declare class CardImg<
  As extends React.ElementType = 'img'
> extends BsPrefixComponent<As, CardImgProps> {}

export default CardImg;
