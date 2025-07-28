import clsx from 'clsx';
import * as React from 'react';
import Anchor from '@restart/ui/Anchor';
import { useNavItem } from '@restart/ui/NavItem';
import { makeEventKey } from '@restart/ui/SelectableContext';
import { DynamicRefForwardingComponent, EventKey } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import type { BaseNavItemProps } from './types.js';

export interface NavLinkProps extends BaseNavItemProps {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'nav-link'
   */
  bsPrefix?: string | undefined;

  /**
   * The ARIA role for the `NavLink`, In the context of a 'tablist' parent Nav,
   * the role defaults to 'tab'
   * */
  role?: string | undefined;

  /**
   * The HTML href attribute for the `NavLink`. Used as the unique identifier
   * for the `NavLink` if an `eventKey` is not provided.
   */
  href?: string | undefined;

  /**
   * Uniquely identifies the `NavItem` amongst its siblings,
   * used to determine and control the active state of the parent `Nav`
   * as well as onSelect behavior of a parent `Navbar`.
   */
  eventKey?: EventKey | undefined;

  /**
   * Whether the link is disabled or not.
   */
  disabled?: boolean | undefined;
}

const NavLink: DynamicRefForwardingComponent<'a', NavLinkProps> =
  React.forwardRef<HTMLElement, NavLinkProps>(
    (
      {
        bsPrefix,
        className,
        as: Component = Anchor,
        active,
        eventKey,
        disabled = false,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
      const [navItemProps, meta] = useNavItem({
        key: makeEventKey(eventKey, props.href),
        active,
        disabled,
        ...props,
      });

      return (
        <Component
          {...props}
          {...navItemProps}
          ref={ref}
          disabled={disabled}
          className={clsx(
            className,
            bsPrefix,
            disabled && 'disabled',
            meta.isActive && 'active',
          )}
        />
      );
    },
  );

NavLink.displayName = 'NavLink';

export default NavLink;
