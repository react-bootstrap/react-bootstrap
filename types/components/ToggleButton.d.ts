import * as React from 'react';

import { Button } from '..';
import { ReplaceProps } from './helpers';

interface ToggleButtonProps {
  type?: 'checkbox' | 'radio';
  checked?: boolean;
  name?: string;
  value: number | string;
}

declare class ToggleButton extends React.Component<
  ReplaceProps<typeof Button, ToggleButtonProps>
> {}
export = ToggleButton;
