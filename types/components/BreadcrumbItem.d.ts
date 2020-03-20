import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface BreadcrumbItemProps {
  active?: boolean;
  href?: string;
  linkAs?: React.ElementType;
  target?: string;
  title?: React.ReactNode;
  listItemProps?: React.LiHTMLAttributes<any>;
}

declare class BreadcrumbItem<
  As extends React.ElementType = 'li'
> extends BsPrefixComponent<As, BreadcrumbItemProps> {}

export default BreadcrumbItem;
