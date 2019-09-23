import * as React from 'react';

import TabContainer from './TabContainer';
import TabContent from './TabContent';
import TabPane from './TabPane';

import { BsPrefixComponent } from './helpers';

export interface TabProps extends Omit<React.ComponentPropsWithRef<typeof TabPane>, "title"> {
  eventKey?: unknown;
  title: React.ReactNode;
  disabled?: boolean;
  tabClassName?: string;
}

declare class Tab extends BsPrefixComponent<'div', TabProps> {
  static Container: typeof TabContainer;
  static Content: typeof TabContent;
  static Pane: typeof TabPane;
}

export default Tab;
