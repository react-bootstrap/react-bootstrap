import * as React from 'react';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'nav-item'
   */
  bsPrefix?: string | undefined;
}

const NavItem: DynamicRefForwardingComponent<'div', NavItemProps> =
  React.forwardRef<HTMLElement, NavItemProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

NavItem.displayName = 'NavItem';

export default NavItem;
