import * as React from 'react';

import CarouselItem from './CarouselItem';
import CarouselCaption from './CarouselCaption';

import { ReplaceProps, SelectCallback } from './helpers';

export interface CarouselProps {
  bsPrefix?: string;
  slide?: boolean;
  fade?: boolean;
  wrap?: boolean;
  indicators?: boolean;
  interval?: number;
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
}

declare class Carousel extends React.Component<
  ReplaceProps<'div', CarouselProps>
> {
  public static Item: typeof CarouselItem;
  public static Caption: typeof CarouselCaption;
}

export default Carousel;
