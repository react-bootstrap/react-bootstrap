import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FormContext from './FormContext.js';
import { useBootstrapPrefix } from './ThemeProvider.js';

type FormCheckInputType = 'checkbox' | 'radio';

export interface FormCheckInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'form-check-input'
   */
  bsPrefix?: string | undefined;

  /**
   * A HTML id attribute, necessary for proper form accessibility.
   */
  id?: string | undefined;

  /**
   * The type of checkable.
   */
  type?: FormCheckInputType | undefined;

  /**
   * Manually style the input as valid
   */
  isValid?: boolean | undefined;

  /**
   * Manually style the input as invalid
   */
  isInvalid?: boolean | undefined;
}

const FormCheckInput: DynamicRefForwardingComponent<
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
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'input',
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-input');

    return (
      <Component
        {...props}
        ref={ref}
        type={type}
        id={id || controlId}
        className={clsx(
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

export default FormCheckInput;
