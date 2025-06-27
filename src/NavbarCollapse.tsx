import * as React from 'react';
import { useContext } from 'react';
import Collapse, { type CollapseProps } from './Collapse.js';
import { useBootstrapPrefix } from './ThemeProvider.js';
import NavbarContext from './NavbarContext.js';

export interface NavbarCollapseProps
  extends Omit<CollapseProps, 'children'>,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'navbar-collapse'
   */
  bsPrefix?: string | undefined;
}

const NavbarCollapse = React.forwardRef<HTMLDivElement, NavbarCollapseProps>(
  ({ children, bsPrefix, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
    const context = useContext(NavbarContext);

    return (
      <Collapse in={!!(context && context.expanded)} {...props}>
        <div ref={ref} className={bsPrefix}>
          {children}
        </div>
      </Collapse>
    );
  },
);

NavbarCollapse.displayName = 'NavbarCollapse';

export default NavbarCollapse;
