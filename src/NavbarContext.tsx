import * as React from 'react';

// TODO: check
export interface NavbarContextType {
  onToggle: () => void;
  bsPrefix?: string;
  expanded: boolean;
  expand?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const context = React.createContext<NavbarContextType | null>(null);
context.displayName = 'NavbarContext';

export default context;
