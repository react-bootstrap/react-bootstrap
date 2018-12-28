import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PanelCollapse {
  export interface PanelCollapseProps extends React.HTMLProps<PanelCollapse> {
    bsPrefix?: string;
    onEnter?: Function;
    onEntering?: Function;
    onEntered?: Function;
    onExit?: Function;
    onExiting?: Function;
    onExited?: Function;
  }
}
declare class PanelCollapse extends React.Component<
  PanelCollapse.PanelCollapseProps
> {}
export = PanelCollapse;
