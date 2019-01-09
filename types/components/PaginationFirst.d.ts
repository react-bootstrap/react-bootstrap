import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PaginationFirst {
  interface PaginationFirstProps
    extends React.HTMLProps<PaginationFirst> {
    disabled?: boolean;
  }
}
declare class PaginationFirst extends React.Component<
  PaginationFirst.PaginationFirstProps
> {}
export = PaginationFirst;
