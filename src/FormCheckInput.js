import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-control'
   */
  bsCustomPrefix: PropTypes.string,

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
    {
      id,
      bsPrefix,
      bsCustomPrefix,
      className,
      isValid,
      isInvalid,
      isStatic,
      ...props
    },
    ref,
  ) => {
    const { controlId, custom } = useContext(FormContext);
    bsPrefix = custom
      ? useBootstrapPrefix(bsCustomPrefix, 'custom-control-input')
      : useBootstrapPrefix(bsPrefix, 'form-check-input');

    return (
      <input
        {...props}
        ref={ref}
        id={id || controlId}
        className={classNames(
          className,
          bsPrefix,
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
