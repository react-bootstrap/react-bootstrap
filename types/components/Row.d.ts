import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface RowProps {
  noGutters?: boolean;
}

declare class Row extends BsPrefixComponent<'div', RowProps> {}

export default Row;
