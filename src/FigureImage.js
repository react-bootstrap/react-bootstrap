import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Image from './Image';

class FigureImage extends React.Component {
  static propTypes = {
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

  static defaultProps = { fluid: true };

  render() {
    const { className, ...props } = this.props;
    return <Image {...props} className={classNames(className, 'figure-img')} />;
  }
}

export default FigureImage;
