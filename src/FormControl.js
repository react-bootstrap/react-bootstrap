import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import warning from 'warning';

import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import Feedback from './Feedback';
import FormContext from './FormContext';
import { createBootstrapComponent } from './ThemeProvider';

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
   * @alias {inputRef}
   */
  ref: PropTypes.any,
  /**
   * Input size variants
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,

  /**
   * The underlying HTML element to use when rendering the FormControl.
   *
   * @type {('input'|'textarea'|elementType)}
   */
  as: elementType,

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
  value: PropTypes.string,

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

const defaultProps = {
  as: 'input',
};

class FormControl extends React.Component {
  render() {
    const {
      bsPrefix,
      type,
      size,
      id,
      inputRef, // eslint-disable-line react/prop-types
      className,
      isValid,
      isInvalid,
      plaintext,
      readOnly,
      as: Component,
      ...props
    } = this.props;

    let classes;
    if (plaintext) {
      classes = { [`${bsPrefix}-plaintext`]: true };
    } else if (type === 'file') {
      classes = { [`${bsPrefix}-file`]: true };
    } else {
      classes = {
        [bsPrefix]: true,
        [`${bsPrefix}-${size}`]: size,
      };
    }

    return (
      <Component
        {...props}
        type={type}
        id={id}
        ref={inputRef}
        readOnly={readOnly}
        className={classNames(
          className,
          classes,
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
        )}
      />
    );
  }
}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;

const mapContext = ({ controlId }, { id }) => {
  warning(
    controlId == null || !id,
    '`controlId` is ignored on `<FormControl>` when `id` is specified.',
  );
  return {
    id: id || controlId,
  };
};

const DecoratedFormControl = mapContextToProps(
  FormContext,
  mapContext,
  createBootstrapComponent(FormControl, {
    prefix: 'form-control',
    forwardRefAs: 'inputRef',
  }),
);

DecoratedFormControl.Feedback = Feedback;

export default DecoratedFormControl;
