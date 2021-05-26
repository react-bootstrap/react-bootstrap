import * as React from 'react';
import { SelectCallback } from './helpers';

export interface AccordionContextValue {
  activeEventKey?: string;
  onSelect?: SelectCallback;
}

const context = React.createContext<AccordionContextValue>({});
context.displayName = 'AccordionContext';

export default context;
