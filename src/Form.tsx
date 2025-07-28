import clsx from 'clsx';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FormCheck from './FormCheck.js';
import FormControl from './FormControl.js';
import FormFloating from './FormFloating.js';
import FormGroup from './FormGroup.js';
import FormLabel from './FormLabel.js';
import FormRange from './FormRange.js';
import FormSelect from './FormSelect.js';
import FormText from './FormText.js';
import Switch from './Switch.js';
import FloatingLabel from './FloatingLabel.js';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated?: boolean;
}

const Form: DynamicRefForwardingComponent<'form', FormProps> = React.forwardRef<
  HTMLFormElement,
  FormProps
>(
  (
    {
      className,
      validated,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'form',
      ...props
    },
    ref,
  ) => (
    <Component
      {...props}
      ref={ref}
      className={clsx(className, validated && 'was-validated')}
    />
  ),
);

Form.displayName = 'Form';

export default Object.assign(Form, {
  Group: FormGroup,
  Control: FormControl,
  Floating: FormFloating,
  Check: FormCheck,
  Switch,
  Label: FormLabel,
  Text: FormText,
  Range: FormRange,
  Select: FormSelect,
  FloatingLabel,
});
