import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import warning from 'warning';

import FormControlFeedback from './FormControlFeedback';
import FormControlStatic from './FormControlStatic';
import { bsClass, getClassSet, splitBsProps, bsSizes } from './utils/bootstrapUtils';
import { SIZE_MAP, Size } from './utils/StyleConfig';
import { prefix } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,
  /**
   * Only relevant if `componentClass` is `'input'`.
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
};

const defaultProps = {
  componentClass: 'input',
};

const contextTypes = {
  $bs_formGroup: PropTypes.object,
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
      bsSize,
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

    // If user provides a size, make sure to append it to classes as input-
    // e.g. if bsSize is small, it will append input-sm
    if (bsSize) {
      const size = SIZE_MAP[bsSize] || bsSize;
      classes[prefix({ bsClass: 'input' }, size)] = true;
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

export default bsClass('form-control',
  bsSizes([Size.SMALL, Size.LARGE], FormControl)
);
