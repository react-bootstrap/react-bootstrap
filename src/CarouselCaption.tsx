import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CarouselCaptionProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CarouselCaption: BsPrefixRefForwardingComponent<
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
) as typeof CarouselCaption;

CarouselCaption.displayName = 'CarouselCaption';

export default CarouselCaption;
