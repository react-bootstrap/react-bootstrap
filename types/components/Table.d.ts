import { BsPrefixComponent } from './helpers';

export interface TableProps {
  striped?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  hover?: boolean;
  size?: string;
  variant?: string;
  responsive?: boolean | string;
}

declare class Table extends BsPrefixComponent<'table', TableProps> {}

export default Table;
