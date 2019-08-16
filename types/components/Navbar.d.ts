import * as React from 'react';

import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarToggle from './NavbarToggle';

import { BsPrefixComponent, SelectCallback } from './helpers';

export class NavbarText<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export interface NavbarProps {
  variant?: 'light' | 'dark';
  expand?: boolean | 'sm' | 'md' | 'lg' | 'xl';
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
  As extends React.ElementType = 'nav'
> extends BsPrefixComponent<As, NavbarProps> {
  static Brand: typeof NavbarBrand;
  static Toggle: typeof NavbarToggle;
  static Collapse: typeof NavbarCollapse;
  static Text: typeof NavbarText;
}

export default Navbar;
