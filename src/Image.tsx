import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

import { BsPrefixAndClassNameOnlyProps } from './helpers';

export interface ImageProps
  extends BsPrefixAndClassNameOnlyProps,
    React.ImgHTMLAttributes<HTMLImageElement> {
  fluid?: boolean;
  rounded?: boolean;
  roundedCircle?: boolean;
  thumbnail?: boolean;
}

export const propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: PropTypes.string,
  /**
   * Sets image as fluid image.
   */
  fluid: PropTypes.bool,

  /**
   * Sets image shape as rounded.
   */
  rounded: PropTypes.bool,

  /**
   * Sets image shape as circle.
   */
  roundedCircle: PropTypes.bool,

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: PropTypes.bool,
};

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

    const classes = classNames(
      fluid && `${bsPrefix}-fluid`,
      rounded && `rounded`,
      roundedCircle && `rounded-circle`,
      thumbnail && `${bsPrefix}-thumbnail`,
    );

    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        ref={ref}
        {...props}
        className={classNames(className, classes)}
      />
    );
  },
);

Image.displayName = 'Image';
Image.propTypes = propTypes;

export default Image;
