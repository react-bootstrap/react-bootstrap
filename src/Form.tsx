import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FormCheck from './FormCheck';
import FormControl from './FormControl';
import FormFloating from './FormFloating';
import FormGroup from './FormGroup';
import FormLabel from './FormLabel';
import FormRange from './FormRange';
import FormSelect from './FormSelect';
import FormText from './FormText';
import Switch from './Switch';
import FloatingLabel from './FloatingLabel';
import { AsProp } from './helpers';

export interface FormProps
  extends React.HTMLAttributes<HTMLFormElement>,
    AsProp {
  validated?: boolean;
}

type Form = React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<HTMLElement>
> & {
  Group: typeof FormGroup;
  Control: typeof FormControl;
  Floating: typeof FormFloating;
  Check: typeof FormCheck;
  Switch: typeof Switch;
  Label: typeof FormLabel;
  Text: typeof FormText;
  Range: typeof FormRange;
  Select: typeof FormSelect;
  FloatingLabel: typeof FloatingLabel;
};

const propTypes = {
  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: PropTypes.bool,
  as: PropTypes.elementType,
};

const FormImpl: Form = (React.forwardRef(
  (
    {
      className,
      validated,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'form',
      ...props
    }: FormProps,
    ref,
  ) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, validated && 'was-validated')}
      />
    );
  },
) as unknown) as Form;

FormImpl.displayName = 'Form';
FormImpl.propTypes = propTypes as any;

FormImpl.Group = FormGroup;
FormImpl.Control = FormControl;
FormImpl.Floating = FormFloating;
FormImpl.Check = FormCheck;
FormImpl.Switch = Switch;
FormImpl.Label = FormLabel;
FormImpl.Text = FormText;
FormImpl.Range = FormRange;
FormImpl.Select = FormSelect;
FormImpl.FloatingLabel = FloatingLabel;

export default FormImpl;
