import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CarouselCaptionProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'carousel-caption'
   */
  bsPrefix?: string | undefined;
}

const CarouselCaption: DynamicRefForwardingComponent<
  'div',
  CarouselCaptionProps
> = React.forwardRef<HTMLElement, CarouselCaptionProps>(
  ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'carousel-caption');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      />
    );
  },
);

CarouselCaption.displayName = 'CarouselCaption';

export default CarouselCaption;
