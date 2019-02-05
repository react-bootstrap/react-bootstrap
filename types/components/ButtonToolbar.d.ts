import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ButtonToolbarProps {
  role?: string;
}

declare class ButtonToolbar extends BsPrefixComponent<
  'div',
  ButtonToolbarProps
> {}

export default ButtonToolbar;
