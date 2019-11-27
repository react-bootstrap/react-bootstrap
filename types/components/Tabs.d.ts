import * as React from 'react';

import Nav, { NavProps } from './Nav';

import {
  BsPrefixComponent,
  SelectCallback,
  BsPrefixComponentClass,
} from './helpers';

export interface TabsProps {
  activeKey?: unknown;
  defaultActiveKey?: unknown;
  onSelect?: SelectCallback;
  variant?: 'tabs' | 'pills';
  transition?: false | React.ElementType;
  id: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

declare class Tabs<
  // Need to use BsPrefixComponentClass to get proper type checking.
  As extends React.ElementType = BsPrefixComponentClass<'div', NavProps>
> extends BsPrefixComponent<As, TabsProps> {}

export default Tabs;
