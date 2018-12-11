import * as React from 'react';

declare namespace DropdownToggle {
  export interface DropdownToggleProps extends React.HTMLProps<DropdownToggle> {
    noCaret?: boolean;
    open?: boolean;
    title?: string;
    useAnchor?: boolean;
    bsPrefix?: string; // Added since v0.30.0
    size?: string;
    variant?: string;
  }
}
declare class DropdownToggle extends React.Component<
  DropdownToggle.DropdownToggleProps
> {}
export = DropdownToggle;
