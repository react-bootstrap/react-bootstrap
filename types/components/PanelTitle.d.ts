import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PanelTitle {
  interface PanelTitleProps extends React.HTMLProps<PanelTitle> {
    componentClass?: string;
    bsPrefix?: string;
    toggle?: boolean;
  }
}
declare class PanelTitle extends React.Component<PanelTitle.PanelTitleProps> {}
export = PanelTitle;
