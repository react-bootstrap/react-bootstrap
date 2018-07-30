import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

class Image extends React.Component {
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

  static defaultProps = {
    fluid: false,
    rounded: false,
    roundedCircle: false,
    thumbnail: false,
  };

  render() {
    const {
      bsPrefix,
      className,
      fluid,
      rounded,
      roundedCircle,
      thumbnail,
      ...props
    } = this.props;

    const classes = classNames(
      fluid && `${bsPrefix}-fluid`,
      rounded && `rounded`,
      roundedCircle && `rounded-circle`,
      thumbnail && `${bsPrefix}-thumbnail`,
    );

    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        {...props}
        className={classNames(className, classes)}
      />
    );
  }
}

export default createBootstrapComponent(Image, 'img');
