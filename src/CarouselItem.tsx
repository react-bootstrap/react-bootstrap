import classNames from 'classnames';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CarouselItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'carousel-item'
   */
  bsPrefix?: string | undefined;

  /** The amount of time to delay between automatically cycling this specific item.
   * Will default to the Carousel's `interval` prop value if none is specified.
   */
  interval?: number | undefined;
}

const CarouselItem: DynamicRefForwardingComponent<'div', CarouselItemProps> =
  React.forwardRef<HTMLElement, CarouselItemProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        ...props
      },
      ref,
    ) => {
      const finalClassName = classNames(
        className,
        useBootstrapPrefix(bsPrefix, 'carousel-item'),
      );
      return <Component ref={ref} {...props} className={finalClassName} />;
    },
  );

CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
