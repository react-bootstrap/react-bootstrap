import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
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
import { BsPrefixRefForwardingComponent, AsProp } from './helpers';

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    AsProp {
  validated?: boolean;
}

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

const Form: BsPrefixRefForwardingComponent<'form', FormProps> =
  React.forwardRef<HTMLFormElement, FormProps>(
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
        className={classNames(className, validated && 'was-validated')}
      />
    ),
  );

Form.displayName = 'Form';
Form.propTypes = propTypes as any;

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
