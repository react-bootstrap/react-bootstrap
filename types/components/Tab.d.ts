import * as React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

import { BsPrefixComponent, PropsOf } from './helpers';

export interface TabProps extends PropsOf<typeof TabPane> {
  eventKey?: unknown;
  title: React.ReactNode;
  disabled?: boolean;
  tabClassName?: string;
}

declare class Tab<As extends React.ReactType = 'div'> extends BsPrefixComponent<
  As,
  TabProps
> {
  static Container: typeof TabContainer;
  static Content: typeof TabContent;
  static Pane: typeof TabPane;
}

export default Tab;
