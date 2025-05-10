import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import warning from 'warning';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import Feedback from './Feedback';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormControlProps
  extends Omit<React.InputHTMLAttributes<FormControlElement>, 'size'> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'form-control'
   */
  bsPrefix?: string | undefined;

  /**
   * The size attribute of the underlying HTML element.
   * Specifies the visible width in characters if `as` is `'input'`.
   */
  htmlSize?: number | undefined;

  /**
   * Input size variants
   */
  size?: 'sm' | 'lg' | undefined;

  /**
   * Render the input as plain text. Generally used along side `readOnly`.
   */
  plaintext?: boolean | undefined;

  /**
   * Make the control readonly
   */
  readOnly?: boolean | undefined;

  /**
   * Make the control disabled
   */
  disabled?: boolean | undefined;

  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value?: string | string[] | number | undefined;

  /**
   * A callback fired when the `value` prop changes
   */
  onChange?: React.ChangeEventHandler<FormControlElement> | undefined;

  /**
   * The HTML input `type`, which is only relevant if `as` is `'input'` (the default).
   */
  type?: string | undefined;

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id?: string | undefined;

  /**
   * Add "valid" validation styles to the control
   */
  isValid?: boolean | undefined;

  /**
   * Add "invalid" validation styles to the control and accompanying label
   */
  isInvalid?: boolean | undefined;
}

const FormControl: DynamicRefForwardingComponent<'input', FormControlProps> =
  React.forwardRef<FormControlElement, FormControlProps>(
    (
      {
        bsPrefix,
        type,
        size,
        htmlSize,
        id,
        className,
        isValid = false,
        isInvalid = false,
        plaintext,
        readOnly,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'input',
        ...props
      },
      ref,
    ) => {
      const { controlId } = useContext(FormContext);

      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-control');

      warning(
        controlId == null || !id,
        '`controlId` is ignored on `<FormControl>` when `id` is specified.',
      );

      return (
        <Component
          {...props}
          type={type}
          size={htmlSize}
          ref={ref}
          readOnly={readOnly}
          id={id || controlId}
          className={classNames(
            className,
            plaintext ? `${bsPrefix}-plaintext` : bsPrefix,
            size && `${bsPrefix}-${size}`,
            type === 'color' && `${bsPrefix}-color`,
            isValid && 'is-valid',
            isInvalid && 'is-invalid',
          )}
        />
      );
    },
  );

FormControl.displayName = 'FormControl';

export default Object.assign(FormControl, {
  Feedback,
});
