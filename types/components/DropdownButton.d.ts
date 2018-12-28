import * as React from 'react';
import { Omit } from './helpers';
import { DropdownBaseProps } from './Dropdown';

declare namespace DropdownButton {
  export interface DropdownButtonBaseProps extends DropdownBaseProps {
    block?: boolean;
    size: string;
    variant?: string | null;
    navItem?: boolean;
    noCaret?: boolean;
    pullRight?: boolean;
    title: React.ReactNode;
  }

  export type DropdownButtonProps = DropdownButtonBaseProps &
    Omit<React.HTMLProps<DropdownButton>, 'title'>;
}
declare class DropdownButton extends React.Component<
  DropdownButton.DropdownButtonProps
> {}
export = DropdownButton;
