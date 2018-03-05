import React from 'react';

export default React.createContext({
  setMenuElement() {},
  setToggleElement() {},
  onClose() {},
  onToggle() {},
  popper: {},
  toggleId: '',
  show: false,
  alignRight: false
});
