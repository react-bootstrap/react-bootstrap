import * as React from 'react';

import SafeAnchor, { SafeAnchorProps } from './SafeAnchor';

import { BsPrefixComponent, SelectCallback, BsPrefixComponentClass } from './helpers';

export interface DropdownItemProps {
  active?: boolean;
  disabled?: boolean;
  eventKey?: string;
  href?: string;
  onClick?: React.MouseEventHandler<this>;
  onSelect?: SelectCallback;
}

declare class DropdownItem<
  As extends React.ElementType = BsPrefixComponentClass<'a', SafeAnchorProps>
> extends BsPrefixComponent<As, DropdownItemProps> {}

export default DropdownItem;
