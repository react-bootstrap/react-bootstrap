import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface NavItemProps {
  role?: string;
}

declare class NavItem extends BsPrefixComponent<'div', NavItemProps> {}

export default NavItem;
