import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PanelHeading {
  export interface PanelHeadingProps extends React.HTMLProps<PanelHeading> {
    componentClass?: string;
    bsPrefix?: string;
  }
}
declare class PanelHeading extends React.Component<
  PanelHeading.PanelHeadingProps
> {}
export = PanelHeading;
