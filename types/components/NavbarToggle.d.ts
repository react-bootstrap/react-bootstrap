import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface NavbarToggleProps {
  label?: string;
}

declare class NavbarToggle<
  As extends React.ReactType = 'button'
> extends BsPrefixComponent<As, NavbarToggleProps> {}

export default NavbarToggle;
