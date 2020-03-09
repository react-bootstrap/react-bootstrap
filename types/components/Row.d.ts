import * as React from 'react';

import { BsPrefixComponent } from './helpers';

type NumberAttr =
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
type RowColSpec = NumberAttr | { cols?: NumberAttr };

export interface RowProps {
  noGutters?: boolean;
  xs?: RowColSpec;
  sm?: RowColSpec;
  md?: RowColSpec;
  lg?: RowColSpec;
  xl?: RowColSpec;
}

declare class Row<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, RowProps> {}

export default Row;
