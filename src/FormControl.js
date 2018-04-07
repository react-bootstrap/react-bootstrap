import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import warning from 'warning';

import InvalidFeedback from './InvalidFeedback';
import {
  bsClass,
  getClassSet,
  prefix,
  splitBsProps,
  bsSizes
} from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

const propTypes = {
  as: elementType,
  /**
   * Render the input as plain text.
   */
  plaintext: PropTypes.bool,

  /** @ignore */
  readOnly: PropTypes.bool,
  /**
   * Only relevant if `as` is `'input'`.
   */
  type: PropTypes.string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: PropTypes.string,
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <FormControl inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: PropTypes.func,
  isValid: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired
};

const defaultProps = {
  as: 'input'
};

const contextTypes = {
  $bs_formGroup: PropTypes.object
};

class FormControl extends React.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const {
      as: Component,
      type,
      id = controlId,
      inputRef,
      className,
      isValid,
      isInvalid,
      plaintext,
      readOnly,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || id === controlId,
      '`controlId` is ignored on `<FormControl>` when `id` is specified.'
    );

    let classes;
    if (type === 'file') {
      classes = { [prefix(bsProps, 'file')]: true };
    } else if (plaintext) {
      classes = { [prefix(bsProps, 'plaintext')]: true };
    } else {
      classes = getClassSet(bsProps);
    }

    return (
      <Component
        {...elementProps}
        type={type}
        id={id}
        ref={inputRef}
        readOnly={readOnly || plaintext}
        className={classNames(
          className,
          classes,
          isValid && prefix(bsProps, 'is-valid'),
          isInvalid && prefix(bsProps, 'is-invalid')
        )}
      />
    );
  }
}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

FormControl.Feedback = InvalidFeedback;

export default bsClass(
  'form-control',
  bsSizes([Size.SMALL, Size.LARGE], FormControl)
);
