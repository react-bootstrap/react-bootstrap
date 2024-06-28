import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface NavbarTextProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const NavbarText: BsPrefixRefForwardingComponent<'span', NavbarTextProps> =
  React.forwardRef<HTMLElement, NavbarTextProps>(
    ({ className, bsPrefix, as: Component = 'span', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-text');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof NavbarText;

NavbarText.displayName = 'NavbarText';

export default NavbarText;
