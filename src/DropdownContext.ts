import * as React from 'react';
import { AlignType } from './types';

export type DropDirection = 'up' | 'start' | 'end' | 'down';

export type DropdownContextValue = {
  align?: AlignType;
  drop?: DropDirection;
  isRTL?: boolean;
};

const DropdownContext = React.createContext<DropdownContextValue>({});
DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
