import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface NavbarBrandProps {
  href?: string;
}

declare class NavbarBrand extends BsPrefixComponent<'a', NavbarBrandProps> {}

export default NavbarBrand;
