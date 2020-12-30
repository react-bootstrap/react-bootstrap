import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface NavbarBrandProps extends BsPrefixProps {
  href?: string;
}

type NavbarBrand = BsPrefixRefForwardingComponent<'a', NavbarBrandProps>;

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

const NavbarBrand: NavbarBrand = React.forwardRef(
  ({ bsPrefix, className, as, ...props }: NavbarBrandProps, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');
    const classNames = useClassNameMapper();

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
