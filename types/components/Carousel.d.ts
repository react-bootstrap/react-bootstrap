import * as React from 'react';

import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';

import { BsPrefixComponent } from './helpers';

export interface CarouselProps {
  bsPrefix?: string;
  slide?: boolean;
  fade?: boolean;
  wrap?: boolean;
  indicators?: boolean;
  interval?: number | null;
  controls?: boolean;
  pauseOnHover?: boolean;
  keyboard?: boolean;
  onSelect?: (eventKey: any, direction: 'prev' | 'next', event: object) => void;
  onSlideEnd?: () => void;
  activeIndex?: number;
  prevIcon?: React.ReactNode;
  prevLabel?: string;
  nextIcon?: React.ReactNode;
  nextLabel?: string;
  touch?: boolean;
}

declare class Carousel<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, CarouselProps> {
  static Item: typeof CarouselItem;
  static Caption: typeof CarouselCaption;
}

export default Carousel;
