/* eslint-disable jsx-a11y/alt-text */

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * src property that is passed down to the image inside this component
   */
  src: PropTypes.string,
  /**
   * alt property that is passed down to the image inside this component
   */
  alt: PropTypes.string,
  /**
   * href property that is passed down to the image inside this component
   */
  href: PropTypes.string,
  /**
   * onError callback that is passed down to the image inside this component
   */
  onError: PropTypes.func,
  /**
   * onLoad callback that is passed down to the image inside this component
   */
  onLoad: PropTypes.func
};

class Thumbnail extends React.Component {
  render() {
    const {
      src,
      alt,
      onError,
      onLoad,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const Component = elementProps.href ? SafeAnchor : 'div';
    const classes = getClassSet(bsProps);

    return (
      <Component {...elementProps} className={classNames(className, classes)}>
        <img {...{ src, alt, onError, onLoad }} />

        {children && <div className="caption">{children}</div>}
      </Component>
    );
  }
}

Thumbnail.propTypes = propTypes;

export default bsClass('thumbnail', Thumbnail);
