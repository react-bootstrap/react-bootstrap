import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { elementType } from 'prop-types-extra';

class Feedback extends React.Component {
  static propTypes = {
    /**
     * Specify whether the feedback is for valid or invalid fields
     *
     * @type {('valid'|'invalid')}
     */
    type: PropTypes.string.isRequired,
    as: elementType,
  };

  static defaultProps = {
    type: 'valid',
    as: 'div',
  };

  render() {
    const { as: Component, className, type, ...props } = this.props;

    return (
      <Component
        {...props}
        className={classNames(className, type && `${type}-feedback`)}
      />
    );
  }
}

export default Feedback;
