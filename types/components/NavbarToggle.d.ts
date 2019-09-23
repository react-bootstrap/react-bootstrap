import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface NavbarToggleProps {
  label?: string;
}

declare class NavbarToggle extends BsPrefixComponent<'button', NavbarToggleProps> {}

export default NavbarToggle;
