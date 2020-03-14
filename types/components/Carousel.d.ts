import * as React from 'react';

import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';

import { BsPrefixComponent } from './helpers';

export interface CarouselProps {
  bsPrefix?: string;
  slide?: boolean;
  fade?: boolean;
  controls?: boolean;
  indicators?: boolean;
  activeIndex?: number;
  onSelect?: (eventKey: number, event: object | null) => void;
  defaultActiveIndex?: number;
  onSlide?: (eventKey: number, direction: 'left' | 'right') => void;
  onSlid?: (eventKey: number, direction: 'left' | 'right') => void;
  interval?: number | null;
  keyboard?: boolean;
  pause?: 'hover' | false;
  wrap?: boolean;
  touch?: boolean;
  prevIcon?: React.ReactNode;
  prevLabel?: React.ReactNode;
  nextIcon?: React.ReactNode;
  nextLabel?: React.ReactNode;
}

declare class Carousel<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, CarouselProps> {
  static Item: typeof CarouselItem;
  static Caption: typeof CarouselCaption;
}

export default Carousel;
