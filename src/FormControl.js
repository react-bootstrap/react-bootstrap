import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import warning from 'warning';

import FormControlFeedback from './FormControlFeedback';
import FormControlStatic from './FormControlStatic';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,
  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: React.PropTypes.string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: React.PropTypes.string,
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <FormControl inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: React.PropTypes.func,
};

const defaultProps = {
  componentClass: 'input',
};

const contextTypes = {
  $bs_formGroup: React.PropTypes.object,
};

class FormControl extends React.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const {
      componentClass: Component,
      type,
      id = controlId,
      inputRef,
      className,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || id === controlId,
      '`controlId` is ignored on `<FormControl>` when `id` is specified.'
    );

    // input[type="file"] should not have .form-control.
    let classes;
    if (type !== 'file') {
      classes = getClassSet(bsProps);
    }

    return (
      <Component
        {...elementProps}
        type={type}
        id={id}
        ref={inputRef}
        className={classNames(className, classes)}
      />
    );
  }
}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

FormControl.Feedback = FormControlFeedback;
FormControl.Static = FormControlStatic;

export default bsClass('form-control', FormControl);
