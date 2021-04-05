import * as React from 'react';
import { AlignType } from './types';

export type DropdownContextValue = {
  align?: AlignType;
};

const DropdownContext = React.createContext<DropdownContextValue>({});
DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
