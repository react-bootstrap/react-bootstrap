import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ButtonToolbarProps {
  role?: string;
}

declare class ButtonToolbar extends BsPrefixComponent<
  'div',
  ButtonToolbarProps
> {}

export default ButtonToolbar;
