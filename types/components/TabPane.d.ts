import * as React from 'react';

import { BsPrefixComponent, TransitionCallbacks } from './helpers';

export interface TabPaneProps extends TransitionCallbacks {
  eventKey?: unknown;
  active?: boolean;
  transition?: false | React.ElementType;
  bsClass?: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

declare class TabPane<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, TabPaneProps> {}

export default TabPane;
