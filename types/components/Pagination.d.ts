import * as React from 'react';

import PageItem, { First, Prev, Ellipsis, Next, Last } from './PageItem';

import { BsPrefixComponent } from './helpers';

interface PaginationProps {
  size?: 'sm' | 'lg';
}

declare class Pagination extends BsPrefixComponent<'ul', PaginationProps> {
  static First: typeof First;
  static Prev: typeof Prev;
  static Ellipsis: typeof Ellipsis;
  static Item: typeof PageItem;
  static Next: typeof Next;
  static Last: typeof Last;
}

export default Pagination;
