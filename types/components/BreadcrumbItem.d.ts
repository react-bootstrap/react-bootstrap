import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface BreadcrumbItemProps {
  active?: boolean;
  href?: string;
  linkAs?: React.ElementType;
  target?: string;
  title?: React.ReactNode;
  linkProps?: React.LinkHTMLAttributes<HTMLLinkElement>;
}

declare class BreadcrumbItem<
  As extends React.ElementType = 'li'
> extends BsPrefixComponent<As, BreadcrumbItemProps> {}

export default BreadcrumbItem;
