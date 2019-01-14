import * as React from 'react';

import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';

import { BsPrefixComponent } from './helpers';

declare class Figure<
  As extends React.ReactType = 'figure'
> extends BsPrefixComponent<As> {
  static Image: typeof FigureImage;
  static Caption: typeof FigureCaption;
}

export default Figure;
