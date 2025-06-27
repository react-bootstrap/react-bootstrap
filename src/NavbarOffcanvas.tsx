import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import type { ModalHandle } from '@restart/ui/Modal';
import Offcanvas, { type OffcanvasProps } from './Offcanvas.js';
import NavbarContext from './NavbarContext.js';

export type NavbarOffcanvasProps = Omit<OffcanvasProps, 'show'>;

const NavbarOffcanvas = React.forwardRef<ModalHandle, NavbarOffcanvasProps>(
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
        onHide={handleHide}
      />
    );
  },
);

NavbarOffcanvas.displayName = 'NavbarOffcanvas';

export default NavbarOffcanvas;
