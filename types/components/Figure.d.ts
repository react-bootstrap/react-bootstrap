import * as React from 'react';

import FigureCaption from './FigureCaption';
import FigureImage from './FigureImage';

import { BsPrefixComponent } from './helpers';

declare class Figure<
  As extends React.ElementType = 'figure'
> extends BsPrefixComponent<As> {
  static Image: typeof FigureImage;
  static Caption: typeof FigureCaption;
}

export default Figure;
