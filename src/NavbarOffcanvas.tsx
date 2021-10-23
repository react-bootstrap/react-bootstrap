import * as React from 'react';
import { useContext } from 'react';
import Offcanvas, { OffcanvasProps } from './Offcanvas';
import NavbarContext from './NavbarContext';

const NavbarOffcanvas = React.forwardRef<HTMLDivElement, OffcanvasProps>(
  (props, ref) => {
    const context = useContext(NavbarContext);

    return <Offcanvas ref={ref} show={!!context?.expanded} {...props} />;
  },
);

NavbarOffcanvas.displayName = 'NavbarOffcanvas';

export default NavbarOffcanvas;
