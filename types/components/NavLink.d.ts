import * as React from 'react';

import SafeAnchor, { SafeAnchorProps } from './SafeAnchor';

import {
  BsPrefixComponent,
  SelectCallback,
  BsPrefixComponentClass,
} from './helpers';

export interface NavLinkProps {
  active?: boolean;
  disabled?: boolean;
  role?: string;
  href?: string;
  onSelect?: SelectCallback;
  eventKey?: unknown;
}

declare class NavLink<
  // Need to use BsPrefixComponentClass to get proper type checking.
  As extends React.ElementType = BsPrefixComponentClass<'a', SafeAnchorProps>
> extends BsPrefixComponent<As, NavLinkProps> {}

export default NavLink;
