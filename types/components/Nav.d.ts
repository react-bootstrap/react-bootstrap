import * as React from 'react';

import NavItem from './NavItem';
import NavLink from './NavLink';

import { BsPrefixComponent, SelectCallback } from './helpers';

declare interface NavProps {
  navbarBsPrefix?: string;
  cardHeaderBsPrefix?: string;
  variant?: 'tabs' | 'pills';
  activeKey?: unknown;
  fill?: boolean;
  justify?: boolean;
  onSelect?: SelectCallback;
  role?: string;
  navbar?: boolean;
  onKeyDown?: React.KeyboardEventHandler<this>;
}

declare class Nav<As extends React.ReactType = 'div'> extends BsPrefixComponent<
  As,
  NavProps
> {
  public static Item: typeof NavItem;
  public static Link: typeof NavLink;
}

export default Nav;
