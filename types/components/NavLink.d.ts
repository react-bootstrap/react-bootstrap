import * as React from 'react';

import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent, SelectCallback } from './helpers';

export interface NavLinkProps {
  active?: boolean;
  disabled?: boolean;
  role?: string;
  href?: string;
  onSelect?: SelectCallback;
  eventKey?: unknown;
}

declare class NavLink<
  As extends React.ReactType = typeof SafeAnchor
> extends BsPrefixComponent<As, NavLinkProps> {}

export default NavLink;
