import * as React from 'react';
import { SelectCallback } from './helpers';

declare namespace PaginationLast {
  interface PaginationLastProps extends React.HTMLProps<PaginationLast> {
    disabled?: boolean;
  }
}
declare class PaginationLast extends React.Component<
  PaginationLast.PaginationLastProps
> {}
export = PaginationLast;
