import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import warning from 'warning';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import Col, { type ColProps } from './Col.js';
import FormContext from './FormContext.js';
import { useBootstrapPrefix } from './ThemeProvider.js';

interface FormLabelBaseProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'form-label'
   */
  bsPrefix?: string | undefined;

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor?: string | undefined;

  /**
   * Hides the label visually while still allowing it to be
   * read by assistive technologies.
   */
  visuallyHidden?: boolean | undefined;
}

export interface FormLabelOwnProps extends FormLabelBaseProps {
  /**
   * Renders the FormLabel as a `<Col>` component (accepting all the same props),
   * as well as adding additional styling for horizontal forms.
   */
  column?: false;
}

export interface FormLabelWithColProps extends FormLabelBaseProps, ColProps {
  /**
   * Renders the FormLabel as a `<Col>` component (accepting all the same props),
   * as well as adding additional styling for horizontal forms.
   */
  column: true | 'sm' | 'lg';
}

export type FormLabelProps = FormLabelWithColProps | FormLabelOwnProps;

const FormLabel: DynamicRefForwardingComponent<'label', FormLabelProps> =
  React.forwardRef<HTMLElement, FormLabelProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'label',
        bsPrefix,
        column = false,
        visuallyHidden = false,
        className,
        htmlFor,
        ...props
      },
      ref,
    ) => {
      const { controlId } = useContext(FormContext);

      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');

      let columnClass = 'col-form-label';
      if (typeof column === 'string')
        columnClass = `${columnClass} ${columnClass}-${column}`;

      const classes = clsx(
        className,
        bsPrefix,
        visuallyHidden && 'visually-hidden',
        column && columnClass,
      );

      warning(
        controlId == null || !htmlFor,
        '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.',
      );
      htmlFor = htmlFor || controlId;

      if (column)
        return (
          <Col
            ref={ref as React.ForwardedRef<HTMLLabelElement>}
            as="label"
            className={classes}
            htmlFor={htmlFor}
            {...props}
          />
        );

      return (
        <Component ref={ref} className={classes} htmlFor={htmlFor} {...props} />
      );
    },
  );

FormLabel.displayName = 'FormLabel';

export default FormLabel;
