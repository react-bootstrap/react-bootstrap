import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
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
};

const defaultProps = {
  type: 'checkbox',
};

const FormCheckInput = React.forwardRef(
  (
    { id, bsPrefix, className, isValid, isInvalid, isStatic, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-input');

    const { controlId, custom } = useContext(FormContext);

    return (
      <input
        {...props}
        ref={ref}
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
    );
  },
);

FormCheckInput.displayName = 'FormCheckInput';
FormCheckInput.propTypes = propTypes;
FormCheckInput.defaultProps = defaultProps;

export default FormCheckInput;
