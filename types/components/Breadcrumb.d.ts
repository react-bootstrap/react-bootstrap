import * as React from 'react';

import BreadcrumbItem from './BreadcrumbItem';

import { BsPrefixComponent } from './helpers';

export interface BreadcrumbProps {
  label?: string;
  listProps?: React.OlHTMLAttributes<HTMLOListElement>;
}

declare class Breadcrumb<
  As extends React.ElementType = 'nav'
> extends BsPrefixComponent<As, BreadcrumbProps> {
  static Item: typeof BreadcrumbItem;
}

export default Breadcrumb;
