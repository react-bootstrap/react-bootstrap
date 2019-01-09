import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PanelToggle {
  interface PanelToggleProps extends React.HTMLProps<PanelToggle> {
    componentClass?: string;
  }
}
declare class PanelToggle extends React.Component<
  PanelToggle.PanelToggleProps
> {}
export = PanelToggle;
