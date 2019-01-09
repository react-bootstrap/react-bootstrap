import * as React from 'react';

import DropdownToggle from './DropdownToggle';
import Dropdown from './Dropdown';

import { ReplaceProps, PropsOf } from './helpers';

type PropsFromToggle = Partial<
  Pick<PropsOf<typeof DropdownToggle>, 'href' | 'size' | 'variant' | 'disabled'>
>;

interface DropdownButtonProps extends PropsFromToggle {
  id: string;
  title: string;
  menuRole?: string;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;
}

declare class DropdownButton extends React.Component<
  ReplaceProps<typeof Dropdown, DropdownButtonProps>
> {}

export default DropdownButton;
