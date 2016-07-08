import classNames from 'classnames';
import React from 'react';

import { bsClass, omitBsProps, prefix } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Sets image as responsive image
   */
  responsive: React.PropTypes.bool,

  /**
   * Sets image shape as rounded
   */
  rounded: React.PropTypes.bool,

  /**
   * Sets image shape as circle
   */
  circle: React.PropTypes.bool,

  /**
   * Sets image shape as thumbnail
   */
  thumbnail: React.PropTypes.bool,
};

const defaultProps = {
  responsive: false,
  rounded: false,
  circle: false,
  thumbnail: false,
};

class Image extends React.Component {
  render() {
    const {
      responsive, rounded, circle, thumbnail, className, ...props,
    } = this.props;

    const classes = {
      [prefix(props, 'responsive')]: responsive,
      [prefix(props, 'rounded')]: rounded,
      [prefix(props, 'circle')]: circle,
      [prefix(props, 'thumbnail')]: thumbnail,
    };

    return (
      <img
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default bsClass('img', Image);
