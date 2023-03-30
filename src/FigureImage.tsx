import classNames from 'classnames';
import * as React from 'react';

import Image, { ImageProps, propTypes as imagePropTypes } from './Image';

const FigureImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fluid = true, ...props }, ref) => (
    <Image
      ref={ref}
      {...props}
      fluid={fluid}
      className={classNames(className, 'figure-img')}
    />
  ),
);

FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = imagePropTypes;

export default FigureImage;
