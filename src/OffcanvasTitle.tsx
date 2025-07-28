import * as React from 'react';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import divWithClassName from './divWithClassName.js';
import { useBootstrapPrefix } from './ThemeProvider.js';

const DivStyledAsH5 = divWithClassName('h5');

export interface OffcanvasTitleProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'offcanvas-title'
   */
  bsPrefix?: string | undefined;
}

const OffcanvasTitle: DynamicRefForwardingComponent<
  'div',
  OffcanvasTitleProps
> = React.forwardRef<HTMLElement, OffcanvasTitleProps>(
  ({ className, bsPrefix, as: Component = DivStyledAsH5, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-title');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

OffcanvasTitle.displayName = 'OffcanvasTitle';

export default OffcanvasTitle;
