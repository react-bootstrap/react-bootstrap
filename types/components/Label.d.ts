import * as React from 'react';

declare namespace Label {
  export interface LabelProps extends React.HTMLProps<Label> {
    // size: string;
    variant?: string;
  }
}
declare class Label extends React.Component<Label.LabelProps> {}
export = Label;
