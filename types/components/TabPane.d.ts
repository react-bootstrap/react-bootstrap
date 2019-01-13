import * as React from 'react';

import { BsPrefixComponent, TransitionCallbacks } from './helpers';

interface TabPaneProps extends TransitionCallbacks {
  eventKey?: unknown;
  active?: boolean;
  transition?: false | React.ReactType;
  bsClass?: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

declare class TabPane<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, TabPaneProps> {}

export default TabPane;
