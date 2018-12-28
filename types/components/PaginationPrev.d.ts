import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PaginationPrev {
  export interface PaginationPrevProps extends React.HTMLProps<PaginationPrev> {
    disabled?: boolean;
  }
}
declare class PaginationPrev extends React.Component<
  PaginationPrev.PaginationPrevProps
> {}
export = PaginationPrev;
