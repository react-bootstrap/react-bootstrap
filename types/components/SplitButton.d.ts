import * as React from 'react';

import DropdownToggle from './DropdownToggle';
import Dropdown from './Dropdown';

import { ReplaceProps, PropsOf } from './helpers';

type PropsFromToggle = Partial<
  Pick<PropsOf<typeof DropdownToggle>, 'size' | 'variant' | 'disabled'>
>;

interface SplitButtonProps extends PropsFromToggle {
  id: string | number;
  toggleLabel?: string;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<this>;
  title: React.ReactNode;
  menuRole?: string;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;
}

declare class SplitButton extends React.Component<
  ReplaceProps<typeof Dropdown, SplitButtonProps>
> {}

export default SplitButton;
