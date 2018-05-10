import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class Image extends React.Component {
  static propTypes = {

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
    thumbnail: PropTypes.bool
  };

  static defaultProps = {
    responsive: false,
    rounded: false,
    circle: false,
    thumbnail: false
  };

  render() {
    const classes = {
      'img-responsive': this.props.responsive,
      'img-rounded': this.props.rounded,
      'img-circle': this.props.circle,
      'img-thumbnail': this.props.thumbnail
    };

    return (
      <img {...this.props} className={classNames(this.props.className, classes)} />
    );
  }
}

export default Image;
