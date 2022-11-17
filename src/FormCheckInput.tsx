import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

type FormCheckInputType = 'checkbox' | 'radio';

export interface FormCheckInputProps
  extends BsPrefixProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  type?: FormCheckInputType;
  isValid?: boolean;
  isInvalid?: boolean;
  indeterminate?: boolean;
}

const propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: PropTypes.string,

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

  /** Manually style the input as valid */
  isValid: PropTypes.bool,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool,

  /** Set whether the input is of indeterminate state */
  indeterminate: PropTypes.bool,
};

const FormCheckInput: BsPrefixRefForwardingComponent<
  'input',
  FormCheckInputProps
> = React.forwardRef<HTMLInputElement, FormCheckInputProps>(
  (
    {
      id,
      bsPrefix,
      className,
      type = 'checkbox',
      isValid = false,
      isInvalid = false,
      indeterminate,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'input',
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-input');

    const [element, inputRef] = useCallbackRef<HTMLInputElement>();
    const existingRef = useMergedRefs(inputRef, ref);

    React.useEffect(() => {
      if (element && element.type === 'checkbox') {
        if (indeterminate) {
          element.indeterminate = true;
        } else {
          element.indeterminate = false;
        }
      }
    }, [element, existingRef, indeterminate, ref, type]);

    return (
      <Component
        {...props}
        // When using indeterminate, 'as' prop has to accept a ref
        ref={indeterminate || ref ? existingRef : undefined}
        type={type}
        id={id || controlId}
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

FormCheckInput.displayName = 'FormCheckInput';
FormCheckInput.propTypes = propTypes;

export default FormCheckInput;
