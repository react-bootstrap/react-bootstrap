import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CarouselItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  interval?: number;
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'carousel-item' */
  bsPrefix: PropTypes.string,

  /** The amount of time to delay between automatically cycling this specific item. Will default to the Carousel's `interval` prop value if none is specified. */
  interval: PropTypes.number,
};

const CarouselItem: BsPrefixRefForwardingComponent<'div', CarouselItemProps> =
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
CarouselItem.propTypes = propTypes;

export default CarouselItem;
