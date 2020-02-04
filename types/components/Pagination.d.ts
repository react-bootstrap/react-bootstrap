import PageItem, { Ellipsis, First, Last, Next, Prev } from './PageItem';

import { BsPrefixComponent } from './helpers';

export interface PaginationProps {
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
