import createWithBsPrefix from './createWithBsPrefix';

import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';

import * as React from 'react';
import { BsPrefixComponent } from './helpers';

declare class Figure<
  As extends React.ElementType = 'figure'
> extends BsPrefixComponent<As> {
  static Image: typeof FigureImage;
  static Caption: typeof FigureCaption;
}

const Figure = createWithBsPrefix('figure', {
  Component: 'figure',
});

Figure.Image = FigureImage;
Figure.Caption = FigureCaption;
export default Figure;
