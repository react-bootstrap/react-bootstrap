import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Sets image as responsive image
   */
  responsive: PropTypes.bool,

  /**
   * Sets image shape as rounded
   */
  rounded: PropTypes.bool,

  /**
   * Sets image shape as circle
   */
  circle: PropTypes.bool,

  /**
   * Sets image shape as thumbnail
   */
  thumbnail: PropTypes.bool,
};

const defaultProps = {
  responsive: false,
  rounded: false,
  circle: false,
  thumbnail: false,
};

class Image extends React.Component {
  render() {
    const { responsive, rounded, circle, thumbnail, className, ...props } =
      this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      [prefix(bsProps, 'responsive')]: responsive,
      [prefix(bsProps, 'rounded')]: rounded,
      [prefix(bsProps, 'circle')]: circle,
      [prefix(bsProps, 'thumbnail')]: thumbnail,
    };

    return (
      <img
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default bsClass('img', Image);
