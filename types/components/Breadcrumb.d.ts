import * as React from 'react';

import BreadcrumbItem from './BreadcrumbItem';

import { BsPrefixComponent } from './helpers';

export interface BreadcrumbProps {
  label?: string;
  listProps?: React.OlHTMLAttributes<any>;
}

declare class Breadcrumb extends BsPrefixComponent<'nav', BreadcrumbProps> {
  static Item: typeof BreadcrumbItem;
}

export default Breadcrumb;
