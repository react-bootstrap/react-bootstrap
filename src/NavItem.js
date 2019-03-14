import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'nav-item'
   */
  bsPrefix: PropTypes.string,

  /** The ARIA role of the component */
  role: PropTypes.string,

  as: PropTypes.elementType,
};

const defaultProps = {
  as: 'div',
};

const NavItem = React.forwardRef(
  ({ bsPrefix, className, children, as: Component, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, bsPrefix)}
      >
        {children}
      </Component>
    );
  },
);

NavItem.displayName = 'NavItem';
NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
