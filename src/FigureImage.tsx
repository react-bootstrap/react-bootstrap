import classNames from 'classnames';
import * as React from 'react';

import Image, { ImageProps, propTypes as imagePropTypes } from './Image';

const defaultProps = { fluid: true };

const FigureImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, ref) => (
    <Image
      ref={ref}
      {...props}
      className={classNames(className, 'figure-img')}
    />
  ),
);

FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = imagePropTypes;
FigureImage.defaultProps = defaultProps;

export default FigureImage;
