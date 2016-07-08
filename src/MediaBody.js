import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
};

class MediaBody extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <Component
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

MediaBody.propTypes = propTypes;
MediaBody.defaultProps = defaultProps;

export default bsClass('media-body', MediaBody);
