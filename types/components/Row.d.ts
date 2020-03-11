import * as React from 'react';

import { BsPrefixComponent } from './helpers';

type RowColWidth =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';
type RowColumns = RowColWidth | { cols?: RowColWidth };

export interface RowProps {
  noGutters?: boolean;
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
}

declare class Row<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, RowProps> {}

export default Row;
