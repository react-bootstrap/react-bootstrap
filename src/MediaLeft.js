import React from 'react';
import classNames from 'classnames';

const MediaLeft = React.createClass({
  displayName: 'Media.Left',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: React.PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render() {
    const {align} = this.props;

    const classes = classNames(
      this.props.className,
      'media-left',
      { [`media-${align}`]: Boolean(align) } // Only add the media-alignment class if align is passed in props
    );

    return (
      <div {...this.props} className={classes}>
        {this.props.children}
      </div>
    );
  }
});

export default MediaLeft;
