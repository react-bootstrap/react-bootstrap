import * as React from 'react';

export interface TabContextType {
  onSelect: any;
  activeKey: any;
  transition: any;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  getControlledId: (key) => any;
  getControllerId: (key) => any;
}

const TabContext = React.createContext<TabContextType | null>(null);

export default TabContext;
