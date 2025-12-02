import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';
import FormContext from './FormContext.js';

export interface FormSelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  /**
   * @default 'form-select'
   */
  bsPrefix?: string | undefined;

  /**
   * The size attribute of the underlying HTML element.
   * Specifies the number of visible options.
   */
  htmlSize?: number | undefined;

  /**
   * Size variants
   *
   * @type {('sm'|'lg')}
   */
  size?: 'sm' | 'lg' | undefined;

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
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;

  /**
   * Add "valid" validation styles to the control
   */
  isValid?: boolean | undefined;

  /**
   * Add "invalid" validation styles to the control and accompanying label
   */
  isInvalid?: boolean | undefined;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      bsPrefix,
      size,
      htmlSize,
      className,
      isValid = false,
      isInvalid = false,
      id,
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-select');

    return (
      <select
        {...props}
        size={htmlSize}
        ref={ref}
        className={clsx(
          className,
          bsPrefix,
          size && `${bsPrefix}-${size}`,
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
        )}
        id={id || controlId}
      />
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
