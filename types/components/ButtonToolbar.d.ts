import * as React from 'react';

declare namespace ButtonToolbar {
  export interface ButtonToolbarProps extends React.HTMLProps<ButtonToolbar> {
    block?: boolean;
    // size: string;
    variant?: string;
    justified?: boolean;
    vertical?: boolean;
  }
}
declare class ButtonToolbar extends React.Component<
  ButtonToolbar.ButtonToolbarProps
> {}
export = ButtonToolbar;
