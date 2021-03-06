import * as React from 'react';

interface CardContextType {
  cardHeaderBsPrefix: string;
}

const context = React.createContext<CardContextType | null>(null);
context.displayName = 'CardContext';

export default context;
