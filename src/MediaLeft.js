import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Media from './Media';
import { bsClass, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

class MediaLeft extends React.Component {
  render() {
    const { align, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[prefix(Media.defaultProps, align)] = true;
    }

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

MediaLeft.propTypes = propTypes;

export default bsClass('media-left', MediaLeft);
