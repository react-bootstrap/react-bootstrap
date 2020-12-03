import React from 'react';
import PropTypes from 'prop-types';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface CarouselItemProps extends BsPrefixPropsWithChildren {
  interval?: number;
}

type CarouselItem = BsPrefixRefForwardingComponent<'div', CarouselItemProps>;

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'carousel-item' */
  bsPrefix: PropTypes.string,

  /** The amount of time to delay between automatically cycling this specific item. Will default to the Carousel's `interval` prop value if none is specified. */
  interval: PropTypes.number,
};

const CarouselItem = (React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      bsPrefix,
      children,
      className,
      ...props
    }: CarouselItemProps,
    ref,
  ) => {
    const classNames = useClassNameMapper();
    const finalClassName = classNames(
      className,
      useBootstrapPrefix(bsPrefix, 'carousel-item'),
    );
    return (
      <Component ref={ref} {...props} className={finalClassName}>
        {children}
      </Component>
    );
  },
) as unknown) as CarouselItem;

CarouselItem.displayName = 'CarouselItem';
CarouselItem.propTypes = propTypes;

export default CarouselItem;
