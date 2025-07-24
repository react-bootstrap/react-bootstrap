import clsx from 'clsx';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'navbar-brand'
   */
  bsPrefix?: string | undefined;

  /**
   * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
   */
  href?: string | undefined;
}

const NavbarBrand: DynamicRefForwardingComponent<'a', NavbarBrandProps> =
  React.forwardRef<HTMLElement, NavbarBrandProps>(
    ({ bsPrefix, className, as, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');

      const Component = as || (props.href ? 'a' : 'span');

      return (
        <Component {...props} ref={ref} className={clsx(className, bsPrefix)} />
      );
    },
  );

NavbarBrand.displayName = 'NavbarBrand';

export default NavbarBrand;
