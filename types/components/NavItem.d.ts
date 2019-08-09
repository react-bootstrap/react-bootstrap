import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface NavItemProps {
  role?: string;
}

declare class NavItem<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, NavItemProps> {}

export default NavItem;
