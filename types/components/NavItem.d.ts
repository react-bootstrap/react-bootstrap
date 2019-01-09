import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface NavItemProps {
  role?: string;
}

declare class NavItem<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, NavItemProps> {}

export default NavItem;
