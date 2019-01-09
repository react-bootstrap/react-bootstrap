import * as React from 'react';
import { TransitionCallbacks } from './helpers';

declare namespace TabPane {
  interface TabPaneProps
    extends TransitionCallbacks,
      React.HTMLProps<TabPane> {
    animation?: boolean | React.ComponentClass<any>;
    'aria-labelledby'?: string;
    bsPrefix?: string;
    eventKey?: any;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  }
}
declare class TabPane extends React.Component<TabPane.TabPaneProps> {}
export = TabPane;
