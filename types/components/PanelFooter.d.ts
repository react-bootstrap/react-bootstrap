import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PanelFooter {
  export interface PanelFooterProps extends React.HTMLProps<PanelFooter> {
    bsPrefix?: string;
  }
}
declare class PanelFooter extends React.Component<
  PanelFooter.PanelFooterProps
> {}
export = PanelFooter;
