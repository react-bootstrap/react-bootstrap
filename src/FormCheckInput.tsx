import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

type FormCheckInputType = 'checkbox' | 'radio';

export interface FormCheckInputProps extends BsPrefixProps {
  id?: string;
  bsCustomPrefix?: string;
  type?: FormCheckInputType;
  isStatic?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
}

type FormCheckInput = BsPrefixRefForwardingComponent<
  'input',
  FormCheckInputProps
>;

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

  /**
   * The underlying HTML element to use when rendering the FormCheckInput.
   *
   * @type {('input'|elementType)}
   */
  as: PropTypes.elementType,

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
  isValid: PropTypes.bool,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool,
};

const FormCheckInput: FormCheckInput = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      bsCustomPrefix,
      className,
      type = 'checkbox',
      isValid = false,
      isInvalid = false,
      isStatic,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'input',
      ...props
    }: FormCheckInputProps,
    ref,
  ) => {
    const { controlId, custom } = useContext(FormContext);
    const [prefix, defaultPrefix] = custom
      ? [bsCustomPrefix, 'custom-control-input']
      : [bsPrefix, 'form-check-input'];

    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
    const classNames = useClassNameMapper();

    return (
      <Component
        {...props}
        ref={ref}
        type={type}
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

export default FormCheckInput;
