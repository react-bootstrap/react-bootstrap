import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixComponent } from './helpers';

export interface NavbarBrandProps {
  href?: string;
}

declare class NavbarBrand<
  As extends React.ElementType = 'a'
> extends BsPrefixComponent<As, NavbarBrandProps> {}

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

const NavbarBrand = React.forwardRef(
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
