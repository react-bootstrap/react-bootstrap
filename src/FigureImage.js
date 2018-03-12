import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Sets image as figure image.
   */
  figureImg: PropTypes.bool,
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
  thumbnail: PropTypes.bool
};

const defaultProps = {
  figureImg: true,
  fluid: true,
  rounded: false,
  roundedCircle: false,
  thumbnail: false
};

class FigureImage extends React.Component {
  render() {
    const {
      figureImg,
      fluid,
      rounded,
      roundedCircle,
      thumbnail,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      'figure-img': figureImg,
      [prefix(bsProps, 'fluid')]: fluid,
      rounded,
      'rounded-circle': roundedCircle,
      [prefix(bsProps, 'thumbnail')]: thumbnail
    };

    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

FigureImage.propTypes = propTypes;
FigureImage.defaultProps = defaultProps;

export default bsClass('img', FigureImage);
