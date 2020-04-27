import createWithBsPrefix from './createWithBsPrefix';

import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';

type Figure = React.ComponentType & {
  Image: typeof FigureImage;
  Caption: typeof FigureCaption;
};

const Figure: Figure = (createWithBsPrefix('figure', {
  Component: 'figure',
}) as unknown) as Figure;

Figure.Image = FigureImage;
Figure.Caption = FigureCaption;
export default Figure;
