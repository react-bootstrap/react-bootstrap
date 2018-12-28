import * as React from 'react';

declare namespace ButtonGroup {
  export interface ButtonGroupProps extends React.HTMLProps<ButtonGroup> {
    block?: boolean;
    // size: string;
    variant?: string;
    justified?: boolean;
    vertical?: boolean;
  }
}
declare class ButtonGroup extends React.Component<
  ButtonGroup.ButtonGroupProps
> {}

export default ButtonGroup;
