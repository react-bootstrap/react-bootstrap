import * as React from 'react';

import Dropdown from './Dropdown';
import DropdownToggle from './DropdownToggle';

import { ReplaceProps } from './helpers';

type PropsFromToggle = Partial<
  Pick<
    React.ComponentPropsWithRef<typeof DropdownToggle>,
    'href' | 'size' | 'variant' | 'disabled'
  >
>;

export interface DropdownButtonProps extends PropsFromToggle {
  id: string;
  title: React.ReactNode;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;
}

declare class DropdownButton extends React.Component<
  ReplaceProps<typeof Dropdown, DropdownButtonProps>
> {}

export default DropdownButton;
