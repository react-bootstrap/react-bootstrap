import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface RowProps {
  noGutters?: boolean;
}

declare class Row<As extends React.ReactType = 'div'> extends BsPrefixComponent<
  As,
  RowProps
> {}

export default Row;
