import * as React from 'react';

import Collapse, { CollapseProps } from './Collapse';

import { BsPrefixComponent } from './helpers';

export interface NavbarCollapseProps
  extends CollapseProps,
    React.HTMLAttributes<HTMLDivElement> {}

declare class NavbarCollapse extends BsPrefixComponent<
  typeof Collapse,
  NavbarCollapseProps
> {}

export default NavbarCollapse;
