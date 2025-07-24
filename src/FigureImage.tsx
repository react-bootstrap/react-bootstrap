import clsx from 'clsx';
import * as React from 'react';

import Image, { type ImageProps } from './Image.js';

const FigureImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fluid = true, ...props }, ref) => (
    <Image
      ref={ref}
      {...props}
      fluid={fluid}
      className={clsx(className, 'figure-img')}
    />
  ),
);

FigureImage.displayName = 'FigureImage';

export default FigureImage;
