import classNames from 'classnames';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  src: React.PropTypes.string,
  alt: React.PropTypes.string,
  href: React.PropTypes.string,
};

class Thumbnail extends React.Component {
  render() {
    const { src, alt, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const Component = elementProps.href ? SafeAnchor : 'div';
    const classes = getClassSet(bsProps);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      >
        <img src={src} alt={alt} />

        {children && (
          <div className="caption">
            {children}
          </div>
        )}
      </Component>
    );
  }
}

Thumbnail.propTypes = propTypes;

export default bsClass('thumbnail', Thumbnail);
