import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface CardImgProps {
  variant?: 'top' | 'bottom';
}

declare class CardImg extends BsPrefixComponent<'img', CardImgProps> {}

export default CardImg;
