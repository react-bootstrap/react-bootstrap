import * as React from 'react';

import { default as BreadcrumbItem } from './BreadcrumbItem';

import { BsPrefixComponent } from './helpers';

declare interface BreadcrumbProps {
  label?: string;
  listProps?: React.OlHTMLAttributes<any>;
}

declare class Breadcrumb<
  As extends React.ReactType = 'nav'
> extends BsPrefixComponent<As, BreadcrumbProps> {
  public static Item: typeof BreadcrumbItem;
}

export default Breadcrumb;
