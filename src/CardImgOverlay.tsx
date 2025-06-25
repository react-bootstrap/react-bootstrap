import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface CardImgOverlayProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card-img-overlay'
   */
  bsPrefix?: string | undefined;
}

const CardImgOverlay: DynamicRefForwardingComponent<
  'div',
  CardImgOverlayProps
> = React.forwardRef<HTMLElement, CardImgOverlayProps>(
  ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-img-overlay');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

CardImgOverlay.displayName = 'CardImgOverlay';

export default CardImgOverlay;
