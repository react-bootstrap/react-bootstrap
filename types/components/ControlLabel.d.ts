import * as React from 'react';

declare namespace ControlLabel {
  export interface ControlLabelProps extends React.HTMLProps<ControlLabel> {
    bsPrefix?: string;
    htmlFor?: string;
    srOnly?: boolean;
  }
}
declare class ControlLabel extends React.Component<
  ControlLabel.ControlLabelProps
> {}
export = ControlLabel;
