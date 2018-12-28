import * as React from 'react';
import { TransitionCallbacks, Omit } from './helpers';
import TabContainer = require('./TabContainer');
import TabPane = require('./TabPane');
import TabContent = require('./TabContent');

declare namespace Tab {
  export interface TabProps
    extends TransitionCallbacks,
      Omit<React.HTMLProps<Tab>, 'title'> {
    animation?: boolean;
    'aria-labelledby'?: string;
    bsPrefix?: string;
    eventKey?: any; // TODO: Add more specific type
    unmountOnExit?: boolean;
    tabClassName?: string;
    // title?: React.ReactNode; // Override HTMLProps.title to allow nodes not just strings
  }
}
declare class Tab extends React.Component<Tab.TabProps> {
  static Container: typeof TabContainer;
  static Content: typeof TabContent;
  static Pane: typeof TabPane;
}
export = Tab;
