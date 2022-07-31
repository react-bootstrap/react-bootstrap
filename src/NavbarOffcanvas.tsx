import * as React from 'react';
import { useContext } from 'react';
import Offcanvas, { OffcanvasProps } from './Offcanvas';
import NavbarContext from './NavbarContext';

export type NavbarOffcanvasProps = Omit<OffcanvasProps, 'show'>;

const NavbarOffcanvas = React.forwardRef<HTMLDivElement, NavbarOffcanvasProps>(
  (props, ref) => {
    const context = useContext(NavbarContext);

    return (
      <Offcanvas
        ref={ref}
        show={!!context?.expanded}
        {...props}
        renderStaticNode
      />
    );
  },
);

NavbarOffcanvas.displayName = 'NavbarOffcanvas';

export default NavbarOffcanvas;
