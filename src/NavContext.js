import React from 'react';

const NavContext = React.createContext({
  activeKey: null,
  onSelect() {}
});

export default NavContext;
