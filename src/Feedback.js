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

  /** Display feedback as a tooltip. */
  tooltip: PropTypes.bool,

  as: PropTypes.elementType,
};

const defaultProps = {
  type: 'valid',
  tooltip: false,
};

const Feedback = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ as: Component = 'div', className, type, tooltip, ...props }, ref) => (
    <Component
      {...props}
      ref={ref}
      className={classNames(
        className,
        `${type}-${tooltip ? 'tooltip' : 'feedback'}`,
      )}
    />
  ),
);

Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;
Feedback.defaultProps = defaultProps;

export default Feedback;
