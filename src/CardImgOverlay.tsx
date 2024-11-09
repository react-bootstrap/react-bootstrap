import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardImgOverlayProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardImgOverlay: BsPrefixRefForwardingComponent<
  'div',
  CardImgOverlayProps
> = React.forwardRef<HTMLElement, CardImgOverlayProps>(
  ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-img-overlay');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      />
    );
  },
) as typeof CardImgOverlay;

CardImgOverlay.displayName = 'CardImgOverlay';

export default CardImgOverlay;
