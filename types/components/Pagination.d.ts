import * as React from 'react';
import { SelectCallback } from './helpers';
import PaginationFirst = require('./PaginationFirst');
import PaginationPrev = require('./PaginationPrev');
import PaginationNext = require('./PaginationNext');
import PaginationLast = require('./PaginationLast');
import PaginationEllipsis = require('./PaginationEllipsis');
import PaginationItem = require('./PaginationItem');

declare namespace Pagination {
  interface PaginationProps extends React.HTMLProps<Pagination> {
    // size: string;
  }
}
declare class Pagination extends React.Component<Pagination.PaginationProps> {
  static First: typeof PaginationFirst;
  static Prev: typeof PaginationPrev;
  static Next: typeof PaginationNext;
  static Last: typeof PaginationLast;
  static Ellipsis: typeof PaginationEllipsis;
  static Item: typeof PaginationItem;
}
export = Pagination;
