import React from 'react';
import PropTypes from 'prop-types';

import Collapse, { CollapseProps } from './Collapse';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import NavbarContext from './NavbarContext';
import { BsPrefixProps } from './helpers';

export interface NavbarCollapseProps
  extends Omit<CollapseProps, 'children'>,
    React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {}

const propTypes = {
  /** @default 'navbar-collapse' */
  bsPrefix: PropTypes.string,
};

const NavbarCollapse = React.forwardRef(
  ({ children, bsPrefix, ...props }: NavbarCollapseProps, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
    const classNames = useClassNameMapper();
    return (
      <NavbarContext.Consumer>
        {(context) => (
          <Collapse in={!!(context && context.expanded)} {...props}>
            <div ref={ref as any} className={classNames(bsPrefix)}>
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
