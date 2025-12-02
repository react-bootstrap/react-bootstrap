import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import FormContext from './FormContext.js';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface FormCheckLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * @default 'form-check-label'
   */
  bsPrefix?: string | undefined;

  /**
   * The HTML for attribute for associating the label with an input
   */
  htmlFor?: string | undefined;
}

const FormCheckLabel = React.forwardRef<HTMLLabelElement, FormCheckLabelProps>(
  ({ bsPrefix, className, htmlFor, ...props }, ref) => {
    const { controlId } = useContext(FormContext);

    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-label');

    return (
      <label
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={clsx(className, bsPrefix)}
      />
    );
  },
);

FormCheckLabel.displayName = 'FormCheckLabel';

export default FormCheckLabel;
