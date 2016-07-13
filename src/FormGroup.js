import classNames from 'classnames';
import React from 'react';

import { bsClass, bsSizes, getClassSet, splitBsPropsAndOmit }
  from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: React.PropTypes.string,
  validationState: React.PropTypes.oneOf(['success', 'warning', 'error']),
};

const childContextTypes = {
  $bs_formGroup: React.PropTypes.object.isRequired,
};

class FormGroup extends React.Component {
  getChildContext() {
    const { controlId, validationState } = this.props;

    return {
      $bs_formGroup: {
        controlId,
        validationState
      },
    };
  }

  hasFeedback(children) {
    return ValidComponentChildren.some(children, child => (
      child.props.bsRole === 'feedback' ||
      child.props.children && this.hasFeedback(child.props.children)
    ));
  }

  render() {
    const { validationState, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['controlId']);

    const classes = {
      ...getClassSet(bsProps),
      'has-feedback': this.hasFeedback(children),
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div
        {...elementProps}
        className={classNames(className, classes)}
      >
        {children}
      </div>
    );
  }
}

FormGroup.propTypes = propTypes;
FormGroup.childContextTypes = childContextTypes;

export default bsClass('form-group',
  bsSizes([Size.LARGE, Size.SMALL], FormGroup)
);
