import * as React from 'react';

import { Button } from '..';
import { PropsOf } from './helpers';

declare namespace ToggleButton {
  interface ToggleButtonProps extends PropsOf<typeof Button> {
    type?: 'checkbox' | 'radio';
    checked?: boolean;
    name?: string;
    value: number | string;
  }
}
declare class ToggleButton extends React.Component<
  ToggleButton.ToggleButtonProps
> {}
export = ToggleButton;
