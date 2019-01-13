import * as React from 'react';

import { BsPrefixComponent, SelectCallback } from './helpers';

interface TabContainerProps {
  id?: string;
  transition?: false | React.ReactType;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  generateChildId?: (eventKey: unknown, type: 'tab' | 'pane') => string;
  onSelect?: SelectCallback;
  activeKey?: unknown;
  defaultActiveKey?: unknown;
}

declare class TabContainer extends React.Component<TabContainerProps> {}

export default TabContainer;
