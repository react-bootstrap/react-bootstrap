import classNames from 'classnames';
import PropTypes from 'prop-types';
import all from 'prop-types-extra/lib/all';
import React, { useContext } from 'react';
import warning from 'warning';
import Feedback from './Feedback';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default {'form-control'}
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom'
   */
  bsCustomPrefix: PropTypes.string,

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
   * Specifies the number of visible options if `as` is `'select'`.
   */
  htmlSize: PropTypes.number,

  /**
   * The underlying HTML element to use when rendering the FormControl.
   *
   * @type {('input'|'textarea'|'select'|elementType)}
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
   * Use Bootstrap's custom form elements to replace the browser defaults
   * @type boolean
   */
  custom: all(PropTypes.bool, ({ as, type, custom }) =>
    custom === true && type !== 'range' && as !== 'select'
      ? Error(
          '`custom` can only be set to `true` when the input type is `range`, or  `select`',
        )
      : null,
  ),

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

const FormControl = React.forwardRef(
  (
    {
      bsPrefix,
      bsCustomPrefix,
      type,
      size,
      htmlSize,
      id,
      className,
      isValid,
      isInvalid,
      plaintext,
      readOnly,
      custom,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'input',
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    const [prefix, defaultPrefix] = custom
      ? [bsCustomPrefix, 'custom']
      : [bsPrefix, 'form-control'];

    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);

    let classes;
    if (plaintext) {
      classes = { [`${bsPrefix}-plaintext`]: true };
    } else if (type === 'file') {
      classes = { [`${bsPrefix}-file`]: true };
    } else if (type === 'range') {
      classes = { [`${bsPrefix}-range`]: true };
    } else if (Component === 'select' && custom) {
      classes = {
        [`${bsPrefix}-select`]: true,
        [`${bsPrefix}-select-${size}`]: size,
      };
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
        )}
      />
    );
  },
);

FormControl.displayName = 'FormControl';
FormControl.propTypes = propTypes;

FormControl.Feedback = Feedback;

export default FormControl;
