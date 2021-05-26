import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as React from 'react';

import SafeAnchor from './SafeAnchor';
import AbstractNavItem, { AbstractNavItemProps } from './AbstractNavItem';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface NavLinkProps
  extends BsPrefixProps,
    Omit<AbstractNavItemProps, 'as'> {}

const propTypes = {
  /**
   * @default 'nav-link'
   */
  bsPrefix: PropTypes.string,

  /**
   * The active state of the NavItem item.
   */
  active: PropTypes.bool,

  /**
   * The disabled state of the NavItem item.
   */
  disabled: PropTypes.bool,

  /**
   * The ARIA role for the `NavLink`, In the context of a 'tablist' parent Nav,
   * the role defaults to 'tab'
   * */
  role: PropTypes.string,

  /** The HTML href attribute for the `NavLink` */
  href: PropTypes.string,

  /** A callback fired when the `NavLink` is selected.
   *
   * ```js
   * function (eventKey: any, event: SyntheticEvent) {}
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * Uniquely identifies the `NavItem` amongst its siblings,
   * used to determine and control the active state of the parent `Nav`
   */
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** @default 'a' */
  as: PropTypes.elementType,
};

const defaultProps = {
  disabled: false,
  as: SafeAnchor,
};

const NavLink: BsPrefixRefForwardingComponent<'a', NavLinkProps> =
  React.forwardRef<HTMLElement, NavLinkProps>(
    ({ bsPrefix, disabled, className, as, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
      return (
        <AbstractNavItem
          {...props}
          ref={ref}
          as={as as any}
          disabled={disabled}
          className={classNames(className, bsPrefix, disabled && 'disabled')}
        />
      );
    },
  );

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
