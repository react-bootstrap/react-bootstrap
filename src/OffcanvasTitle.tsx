import * as React from 'react';
import classNames from 'classnames';
import divWithClassName from './divWithClassName';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

const DivStyledAsH5 = divWithClassName('h5');

export interface OffcanvasTitleProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const OffcanvasTitle: BsPrefixRefForwardingComponent<
  'div',
  OffcanvasTitleProps
> = React.forwardRef<HTMLElement, OffcanvasTitleProps>(
  ({ className, bsPrefix, as: Component = DivStyledAsH5, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-title');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      />
    );
  },
) as typeof OffcanvasTitle;

OffcanvasTitle.displayName = 'OffcanvasTitle';

export default OffcanvasTitle;
