import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';
import FormContext from './FormContext';

const propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: PropTypes.string,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string,

  /** The type of checkable. */
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

  /**
   * A convenience prop shortcut for adding `position-static` to the input, for
   * correct styling when used without an FormCheckLabel
   */
  isStatic: PropTypes.bool,

  /** Manually style the input as valid */
  isValid: PropTypes.bool.isRequired,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool.isRequired,

  /**
   * @private
   */
  innerRef: PropTypes.any,
};

const defaultProps = {
  type: 'checkbox',
};

function FormCheckInput({
  id,
  bsPrefix,
  className,
  isValid,
  isInvalid,
  innerRef,
  isStatic,
  ...props
}) {
  return (
    <FormContext.Consumer>
      {({ controlId, custom }) => (
        <input
          {...props}
          ref={innerRef}
          id={id || controlId}
          className={classNames(
            className,
            !custom && bsPrefix,
            custom && 'custom-control-input',
            isValid && 'is-valid',
            isInvalid && 'is-invalid',
            isStatic && 'position-static',
          )}
        />
      )}
    </FormContext.Consumer>
  );
}

FormCheckInput.propTypes = propTypes;
FormCheckInput.defaultProps = defaultProps;

export default createBootstrapComponent(FormCheckInput, 'form-check-input');
