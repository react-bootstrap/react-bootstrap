import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import Offcanvas, { OffcanvasProps } from './Offcanvas';
import NavbarContext from './NavbarContext';

export type NavbarOffcanvasProps = Omit<OffcanvasProps, 'show'>;

const NavbarOffcanvas = React.forwardRef<HTMLDivElement, NavbarOffcanvasProps>(
  ({ onHide, ...props }, ref) => {
    const context = useContext(NavbarContext);

    const handleHide = useEventCallback(() => {
      context?.onToggle?.();
      onHide?.();
    });

    return (
      <Offcanvas
        ref={ref}
        show={!!context?.expanded}
        {...props}
        renderStaticNode
        onHide={handleHide}
      />
    );
  },
);

NavbarOffcanvas.displayName = 'NavbarOffcanvas';

export default NavbarOffcanvas;
