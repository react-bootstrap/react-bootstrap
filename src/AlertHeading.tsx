import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import divWithClassName from './divWithClassName';

const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';

export interface AlertHeadingProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'alert-heading'
   */
  bsPrefix?: string | undefined;
}

const AlertHeading: DynamicRefForwardingComponent<'div', AlertHeadingProps> =
  React.forwardRef<HTMLElement, AlertHeadingProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH4, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-heading');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

AlertHeading.displayName = 'AlertHeading';

export default AlertHeading;
