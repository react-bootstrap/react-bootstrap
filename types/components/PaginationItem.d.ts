import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PaginationItem {
  export interface PaginationItemProps extends React.HTMLProps<PaginationItem> {
    disabled?: boolean;
    active?: boolean;
  }
}
declare class PaginationItem extends React.Component<
  PaginationItem.PaginationItemProps
> {}
export = PaginationItem;
