import React from 'react';

const SelectableContext = React.createContext(/* () => {} */);

export const makeEventKey = (eventKey, href) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

export default SelectableContext;
