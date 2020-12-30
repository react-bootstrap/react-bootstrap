import PropTypes from 'prop-types';
import React from 'react';
import FormCheck from './FormCheck';
import FormFile from './FormFile';
import FormControl from './FormControl';
import FormGroup from './FormGroup';
import FormLabel from './FormLabel';
import FormText from './FormText';
import Switch from './Switch';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import createWithBsPrefix from './createWithBsPrefix';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

const FormRow = createWithBsPrefix('form-row');

export interface FormProps
  extends React.HTMLAttributes<HTMLFormElement>,
    BsPrefixProps {
  inline?: boolean;
  validated?: boolean;
}

type Form = BsPrefixRefForwardingComponent<'form', FormProps> & {
  Row: typeof FormRow;
  Group: typeof FormGroup;
  Control: typeof FormControl;
  Check: typeof FormCheck;
  File: typeof FormFile;
  Switch: typeof Switch;
  Label: typeof FormLabel;
  Text: typeof FormText;
};

const propTypes = {
  /**
   * @default {'form'}
   */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,

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
   * Display the series of labels, form controls,
   * and buttons on a single horizontal row
   */
  inline: PropTypes.bool,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  inline: false,
};

const FormImpl: Form = (React.forwardRef(
  (
    {
      bsPrefix,
      inline,
      className,
      validated,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'form',
      ...props
    }: FormProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form');
    const classNames = useClassNameMapper();
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          className,
          validated && 'was-validated',
          inline && `${bsPrefix}-inline`,
        )}
      />
    );
  },
) as unknown) as Form;

FormImpl.displayName = 'Form';
FormImpl.propTypes = propTypes;
FormImpl.defaultProps = defaultProps;

FormImpl.Row = FormRow;
FormImpl.Group = FormGroup;
FormImpl.Control = FormControl;
FormImpl.Check = FormCheck;
FormImpl.File = FormFile;
FormImpl.Switch = Switch;
FormImpl.Label = FormLabel;
FormImpl.Text = FormText;

export default FormImpl;
