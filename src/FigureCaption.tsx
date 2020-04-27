import createWithBsPrefix from './createWithBsPrefix';

import * as React from 'react';
import { BsPrefixComponent } from './helpers';

declare class FigureCaption<
  As extends React.ElementType = 'figcaption'
> extends BsPrefixComponent<As> {}

const FigureCaption = createWithBsPrefix('figure-caption', {
  Component: 'figcaption',
});

export default FigureCaption;
