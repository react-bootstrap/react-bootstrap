import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface SafeAnchorProps {
  href?: string;
  onClick?: React.MouseEventHandler<this>;
  onKeyDown?: React.KeyboardEventHandler<this>;
  disabled?: boolean;
  role?: string;
  tabIndex?: number | string;
}

declare class SafeAnchor extends BsPrefixComponent<'a', SafeAnchorProps> {}

export default SafeAnchor;
