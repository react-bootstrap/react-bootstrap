import * as React from 'react';

import Nav from './Nav';

import { BsPrefixComponent, SelectCallback } from './helpers';

export interface TabsProps {
  activeKey?: unknown;
  defaultActiveKey?: unknown;
  onSelect?: SelectCallback;
  variant?: 'tabs' | 'pills';
  transition?: false | React.ReactType;
  id: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

declare class Tabs<
  As extends React.ReactType = typeof Nav
> extends BsPrefixComponent<As, TabsProps> {}

export default Tabs;
