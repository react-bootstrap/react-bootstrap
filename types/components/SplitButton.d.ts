import * as React from 'react';

import DropdownToggle from './DropdownToggle';
import Dropdown from './Dropdown';

import { ReplaceProps } from './helpers';

type PropsFromToggle = Partial<
  Pick<
    React.ComponentPropsWithRef<typeof DropdownToggle>,
    'size' | 'variant' | 'disabled'
  >
>;

export interface SplitButtonProps extends PropsFromToggle {
  id: string | number;
  toggleLabel?: string;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<this>;
  title: React.ReactNode;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;
}

declare class SplitButton extends React.Component<
  ReplaceProps<typeof Dropdown, SplitButtonProps>
> {}

export default SplitButton;
