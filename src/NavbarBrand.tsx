import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface NavbarBrandProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  href?: string;
}

const propTypes = {
  /** @default 'navbar' */
  bsPrefix: PropTypes.string,

  /**
   * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
   */
  href: PropTypes.string,

  /**
   * Set a custom element for this component.
   */
  as: PropTypes.elementType,
};

const NavbarBrand: BsPrefixRefForwardingComponent<'a', NavbarBrandProps> =
  React.forwardRef<HTMLElement, NavbarBrandProps>(
    ({ bsPrefix, className, as, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');

      const Component = as || (props.href ? 'a' : 'span');

      return (
        <Component
          {...props}
          ref={ref}
          className={classNames(className, bsPrefix)}
        />
      );
    },
  );

NavbarBrand.displayName = 'NavbarBrand';
NavbarBrand.propTypes = propTypes;

export default NavbarBrand;
