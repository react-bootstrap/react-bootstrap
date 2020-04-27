import createWithBsPrefix from './createWithBsPrefix';

import { BsPrefixComponent } from './helpers';

declare class CarouselItem extends BsPrefixComponent<'div'> {}

export default createWithBsPrefix('carousel-item');
