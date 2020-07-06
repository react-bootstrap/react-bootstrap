import React from 'react';

const context = React.createContext<string | null>(null);
context.displayName = 'AccordionContext';

export default context;
