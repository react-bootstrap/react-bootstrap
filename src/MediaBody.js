import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import Media from './Media';
import {
  bsClass,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),

  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class MediaBody extends React.Component {
  render() {
    const {
      componentClass: Component,
      align,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[prefix(Media.defaultProps, align)] = true;
    }

    return (
      <Component {...elementProps} className={classNames(className, classes)} />
    );
  }
}

MediaBody.propTypes = propTypes;
MediaBody.defaultProps = defaultProps;

export default bsClass('media-body', MediaBody);
