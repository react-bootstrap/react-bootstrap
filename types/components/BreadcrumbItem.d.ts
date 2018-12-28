import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface BreadcrumbItemProps {
  active?: boolean;
  href?: string;
  target?: string;
  title?: React.ReactNode;
}

declare class BreadcrumbItem extends BsPrefixComponent<
  'li',
  BreadcrumbItemProps
> {}

export default BreadcrumbItem;
