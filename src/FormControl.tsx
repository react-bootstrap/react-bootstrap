import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import warning from 'warning';
import Feedback from './Feedback';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormControlProps
  extends BsPrefixProps,
    React.HTMLAttributes<FormControlElement> {
  htmlSize?: number;
  size?: 'sm' | 'lg';
  plaintext?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string | string[] | number;
  onChange?: React.ChangeEventHandler<FormControlElement>;
  type?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

const propTypes = {
  /**
   * @default {'form-control'}
   */
  bsPrefix: PropTypes.string,

  /**
   * The FormControl `ref` will be forwarded to the underlying input element,
   * which means unless `as` is a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,
  /**
   * Input size variants
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,

  /**
   * The size attribute of the underlying HTML element.
   * Specifies the visible width in characters if `as` is `'input'`.
   */
  htmlSize: PropTypes.number,

  /**
   * The underlying HTML element to use when rendering the FormControl.
   *
   * @type {('input'|'textarea'|elementType)}
   */
  as: PropTypes.elementType,

  /**
   * Render the input as plain text. Generally used along side `readOnly`.
   */
  plaintext: PropTypes.bool,

  /** Make the control readonly */
  readOnly: PropTypes.bool,

  /** Make the control disabled */
  disabled: PropTypes.bool,

  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),

  /** A callback fired when the `value` prop changes */
  onChange: PropTypes.func,

  /**
   * The HTML input `type`, which is only relevant if `as` is `'input'` (the default).
   */
  type: PropTypes.string,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: PropTypes.string,

  /** Add "valid" validation styles to the control */
  isValid: PropTypes.bool,

  /** Add "invalid" validation styles to the control and accompanying label */
  isInvalid: PropTypes.bool,
};

const FormControl: BsPrefixRefForwardingComponent<'input', FormControlProps> =
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

      let classes;
      if (plaintext) {
        classes = { [`${bsPrefix}-plaintext`]: true };
      } else {
        classes = {
          [bsPrefix]: true,
          [`${bsPrefix}-${size}`]: size,
        };
      }

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
            classes,
            isValid && `is-valid`,
            isInvalid && `is-invalid`,
            type === 'color' && `${bsPrefix}-color`,
          )}
        />
      );
    },
  );

FormControl.displayName = 'FormControl';
FormControl.propTypes = propTypes;

export default Object.assign(FormControl, { Feedback });
