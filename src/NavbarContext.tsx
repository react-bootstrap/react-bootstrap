import * as React from 'react';
import type { LiteralUnion } from './types.js';

// TODO: check
export interface NavbarContextType {
  onToggle: () => void;
  bsPrefix?: string;
  expanded: boolean;
  expand?: boolean | LiteralUnion<'sm' | 'md' | 'lg' | 'xl' | 'xxl', string>;
}

const context = React.createContext<NavbarContextType | null>(null);
context.displayName = 'NavbarContext';

export default context;
