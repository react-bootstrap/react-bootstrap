import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import divWithClassName from './divWithClassName';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';

export interface AlertHeadingProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const AlertHeading: BsPrefixRefForwardingComponent<'div', AlertHeadingProps> =
  React.forwardRef<HTMLElement, AlertHeadingProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH4, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-heading');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof AlertHeading;

AlertHeading.displayName = 'AlertHeading';

export default AlertHeading;
