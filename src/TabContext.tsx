import React from 'react';

// TODO
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
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
