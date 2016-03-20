import React from 'react';
import classNames from 'classnames';

const MediaRight = React.createClass({
  displayName: 'Media.Right',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: React.PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render() {
    const {align, className, ...props} = this.props;

    const classes = classNames(
      className,
      'media-right',
      { [`media-${align}`]: Boolean(align) } // Only add the media-alignment class if align is passed in props
    );

    return (
      <div {...props} className={classes} />
    );
  }
});

export default MediaRight;
