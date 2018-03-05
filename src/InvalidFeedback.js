import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class InvalidFeedback extends React.Component {
  render() {
    const { className, componentClass: Component, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    return (
      <Component
        {...elementProps}
        className={classNames(className, getClassSet(bsProps))}
      />
    );
  }
}

InvalidFeedback.defaultProps = defaultProps;
InvalidFeedback.propTypes = propTypes;

export default bsClass('invalid-feedback', InvalidFeedback);
