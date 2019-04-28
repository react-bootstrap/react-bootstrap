import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: PropTypes.string.isRequired,
  as: PropTypes.elementType,
};

const defaultProps = {
  type: 'valid',
};

const Feedback = React.forwardRef(
  ({ as: Component = 'div', className, type, ...props }, ref) => (
    <Component
      {...props}
      ref={ref}
      className={classNames(className, type && `${type}-feedback`)}
    />
  ),
);

Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;
Feedback.defaultProps = defaultProps;

export default Feedback;
