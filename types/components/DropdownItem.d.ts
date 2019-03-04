import * as React from 'react';

import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent } from './helpers';

export interface DropdownItemProps<T> {
  active?: boolean;
  disabled?: boolean;
  eventKey?: T;
  href?: string;
  onClick?: React.MouseEventHandler<this>;
  onSelect?: (eventKey: T, e: React.SyntheticEvent<this>) => void;
}

declare class DropdownItem<
  EventKey,
  As extends React.ReactType = typeof SafeAnchor
> extends BsPrefixComponent<As, DropdownItemProps<EventKey>> {}

export default DropdownItem;
