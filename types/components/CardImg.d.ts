import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface CardImgProps {
  variant?: 'top' | 'bottom';
}

declare class CardImg<
  As extends React.ReactType = 'img'
> extends BsPrefixComponent<As, CardImgProps> {}

export default CardImg;
