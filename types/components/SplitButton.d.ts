import * as React from 'react';
import { Omit } from './helpers';

declare namespace SplitButton {
  export interface SplitButtonProps
    extends Omit<React.HTMLProps<SplitButton>, 'title'> {
    variant?: string;
    // size: string;
    dropdownTitle?: any; // TODO: Add more specific type
    dropup?: boolean;
    pullRight?: boolean;
    // title: React.ReactNode;
    id: string;
  }
}
declare class SplitButton extends React.Component<
  SplitButton.SplitButtonProps
> {}
export = SplitButton;
