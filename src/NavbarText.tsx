import * as React from 'react';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface NavbarTextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'navbar-text'
   */
  bsPrefix?: string | undefined;
}

const NavbarText: DynamicRefForwardingComponent<'span', NavbarTextProps> =
  React.forwardRef<HTMLElement, NavbarTextProps>(
    ({ className, bsPrefix, as: Component = 'span', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-text');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

NavbarText.displayName = 'NavbarText';

export default NavbarText;
