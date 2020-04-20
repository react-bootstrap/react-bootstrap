import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-file-input'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file-input'
   */
  bsCustomPrefix: PropTypes.string,

  /**
   * The underlying HTML element to use when rendering the FormFileInput.
   *
   * @type {('input'|elementType)}
   */
  as: PropTypes.elementType,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string,

  /** Manually style the input as valid */
  isValid: PropTypes.bool.isRequired,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool.isRequired,

  /** The language for the button when using custom file input and SCSS based strings */
  lang: PropTypes.string,
};

const FormFileInput = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      bsCustomPrefix,
      className,
      isValid,
      isInvalid,
      lang,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'input',
      ...props
    },
    ref,
  ) => {
    const { controlId, custom } = useContext(FormContext);
    const type = 'file';

    const [prefix, defaultPrefix] = custom
      ? [bsCustomPrefix, 'custom-file-input']
      : [bsPrefix, 'form-control-file'];

    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);

    return (
      <Component
        {...props}
        ref={ref}
        id={id || controlId}
        type={type}
        lang={lang}
        className={classNames(
          className,
          bsPrefix,
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
        )}
      />
    );
  },
);

FormFileInput.displayName = 'FormFileInput';
FormFileInput.propTypes = propTypes;

export default FormFileInput;
