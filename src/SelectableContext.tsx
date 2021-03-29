import React from 'react';

// TODO (apparently this is a bare "onSelect"?)
type SelectableContextType = (key: string | null, event: any) => void;

const SelectableContext = React.createContext<SelectableContextType | null>(
  null,
);

export const makeEventKey = (
  eventKey?: string | number | null,
  href: string | null = null,
): string | null => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

export default SelectableContext;
