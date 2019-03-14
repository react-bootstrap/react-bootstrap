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
type ColSize = true | 'auto' | NumberAttr;
type ColSpec =
  | ColSize
  | { span?: ColSize; offset?: NumberAttr; order?: NumberAttr };

export interface ColProps {
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
}

declare class Col<As extends React.ReactType = 'div'> extends BsPrefixComponent<
  As,
  ColProps
> {}

export default Col;
