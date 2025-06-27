import clsx from 'clsx';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * @default 'img'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets image as fluid image.
   */
  fluid?: boolean | undefined;

  /**
   * Sets image shape as rounded.
   */
  rounded?: boolean | undefined;

  /**
   * Sets image shape as circle.
   */
  roundedCircle?: boolean | undefined;

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail?: boolean | undefined;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      bsPrefix,
      className,
      fluid = false,
      rounded = false,
      roundedCircle = false,
      thumbnail = false,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'img');
    return (
      <img
        ref={ref}
        {...props}
        className={clsx(
          className,
          fluid && `${bsPrefix}-fluid`,
          rounded && `rounded`,
          roundedCircle && `rounded-circle`,
          thumbnail && `${bsPrefix}-thumbnail`,
        )}
      />
    );
  },
);

Image.displayName = 'Image';

export default Image;
