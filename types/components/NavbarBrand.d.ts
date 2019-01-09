import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface NavbarBrandProps {
  href?: string;
}

declare class NavbarBrand<
  As extends React.ReactType = 'a'
> extends BsPrefixComponent<As, NavbarBrandProps> {}

export default NavbarBrand;
