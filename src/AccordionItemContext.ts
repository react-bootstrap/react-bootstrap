import * as React from 'react';

export interface AccordionItemContextValue {
  eventKey: string;
}

const context = React.createContext<AccordionItemContextValue>({
  eventKey: '',
});
context.displayName = 'AccordionItemContext';

export default context;
