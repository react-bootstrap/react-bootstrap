import React from 'react';
import classNames from 'classnames';

const Image = React.createClass({

  propTypes: {

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
    thumbnail: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      responsive: false,
      rounded: false,
      circle: false,
      thumbnail: false
    };
  },

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
});

export default Image;
