import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface NavbarToggleProps {
  label?: string;
}

declare class NavbarToggle<
  As extends React.ElementType = 'button'
> extends BsPrefixComponent<As, NavbarToggleProps> {}

export default NavbarToggle;
