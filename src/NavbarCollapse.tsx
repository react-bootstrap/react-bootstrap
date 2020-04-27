import React from 'react';
import PropTypes from 'prop-types';

import Collapse, { CollapseProps } from './Collapse';
import { useBootstrapPrefix } from './ThemeProvider';
import NavbarContext from './NavbarContext';
import { BsPrefixComponent } from './helpers';

export interface NavbarCollapseProps
  extends CollapseProps,
    React.HTMLAttributes<HTMLDivElement> {}

declare class NavbarCollapse extends BsPrefixComponent<
  typeof Collapse,
  NavbarCollapseProps
> {}

const propTypes = {
  /** @default 'navbar-collapse' */
  bsPrefix: PropTypes.string,
};

const NavbarCollapse = React.forwardRef(
  ({ children, bsPrefix, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
    return (
      <NavbarContext.Consumer>
        {(context) => (
          <Collapse in={!!(context && context.expanded)} {...props}>
            <div ref={ref} className={bsPrefix}>
              {children}
            </div>
          </Collapse>
        )}
      </NavbarContext.Consumer>
    );
  },
);

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
