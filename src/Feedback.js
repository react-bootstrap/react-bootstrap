import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import elementType from 'prop-types-extra/lib/elementType';

class Feedback extends React.Component {
  static propTypes = {
    invalid: PropTypes.bool.isRequired,
    componentClass: elementType
  };
  static defaultProps = {
    invalid: false,
    componentClass: 'div'
  };

  render() {
    const {
      componentClass: Component,
      className,
      invalid,
      ...props
    } = this.props;

    return (
      <Component
        classname={classNames(
          className,
          `${invalid ? 'invalid' : 'valid'}-feedback`
        )}
        {...props}
      />
    );
  }
}

export default Feedback;
