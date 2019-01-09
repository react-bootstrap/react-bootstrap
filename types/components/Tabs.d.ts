import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace Tabs {
  interface TabsProps extends React.HTMLProps<Tabs> {
    activeKey?: any;
    animation?: boolean;
    variant?: string;
    defaultActiveKey?: any;
    onSelect?: SelectCallback;
    paneWidth?: any; // TODO: Add more specific type
    position?: string;
    tabWidth?: any; // TODO: Add more specific type
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    justified?: boolean;
  }
}
declare class Tabs extends React.Component<Tabs.TabsProps> {}
export = Tabs;
