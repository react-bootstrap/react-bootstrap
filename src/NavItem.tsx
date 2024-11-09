import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface NavItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const NavItem: BsPrefixRefForwardingComponent<'div', NavItemProps> =
  React.forwardRef<HTMLElement, NavItemProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof NavItem;

NavItem.displayName = 'NavItem';

export default NavItem;
