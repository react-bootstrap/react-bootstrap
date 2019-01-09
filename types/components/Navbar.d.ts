import * as React from 'react';

import NavbarBrand from './NavbarBrand';
import NavbarToggle from './NavbarToggle';
import NavbarCollapse from './NavbarCollapse';

import { BsPrefixComponent, SelectCallback } from './helpers';

declare class NavbarText<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare interface NavbarProps {
  variant?: 'light' | 'dark';
  expand?: true | 'sm' | 'md' | 'lg' | 'xl';
  bg?: string;
  fixed?: 'top' | 'bottom';
  sticky?: 'top' | 'bottom';
  onToggle?: (expanded: boolean) => void;
  onSelect?: SelectCallback;
  collapseOnSelect?: boolean;
  expanded?: boolean;
  role?: string;
}

declare class Navbar<
  As extends React.ReactType = 'nav'
> extends BsPrefixComponent<As, NavbarProps> {
  public static Brand: typeof NavbarBrand;
  public static Toggle: typeof NavbarToggle;
  public static Collapse: typeof NavbarCollapse;
  public static Text: typeof NavbarText;
}

export default Navbar;
