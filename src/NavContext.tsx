import * as React from 'react';

// TODO: check this
interface NavContextType {
  role?: string; // used by NavLink to determine it's role
  activeKey: any;
  getControlledId: (key: any) => any;
  getControllerId: (key: any) => any;
}

const NavContext = React.createContext<NavContextType | null>(null);
NavContext.displayName = 'NavContext';

export default NavContext;
