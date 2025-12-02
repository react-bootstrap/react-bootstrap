import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';
import FormContext from './FormContext.js';

export interface FormRangeProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'form-range'
   */
  bsPrefix?: string | undefined;

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id?: string | undefined;
}

const FormRange = React.forwardRef<HTMLInputElement, FormRangeProps>(
  ({ bsPrefix, className, id, ...props }, ref) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-range');

    return (
      <input
        {...props}
        type="range"
        ref={ref}
        className={clsx(className, bsPrefix)}
        id={id || controlId}
      />
    );
  },
);

FormRange.displayName = 'FormRange';

export default FormRange;
