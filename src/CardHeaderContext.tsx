import * as React from 'react';

interface CardHeaderContextValue {
  cardHeaderBsPrefix: string;
}

const context = React.createContext<CardHeaderContextValue | null>(null);
context.displayName = 'CardHeaderContext';

export default context;
