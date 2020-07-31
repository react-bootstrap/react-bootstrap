import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FormFileInputProps extends BsPrefixProps {
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}
type FormFileInput = BsPrefixRefForwardingComponent<
  'input',
  FormFileInputProps
>;

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
  isValid: PropTypes.bool,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool,
};

const FormFileInput: FormFileInput = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      className,
      isValid,
      isInvalid,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'input',
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-file-input');

    return (
      <Component
        {...props}
        ref={ref}
        id={id || controlId}
        type="file"
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
