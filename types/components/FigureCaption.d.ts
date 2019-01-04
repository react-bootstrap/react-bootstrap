import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class FigureCaption<
  As extends React.ReactType = 'figcaption'
> extends BsPrefixComponent<As> {}

export default FigureCaption;
