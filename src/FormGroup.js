import classNames from 'classnames';
import React from 'react';
import deprecated from 'react-prop-types/lib/deprecated';

import { Sizes } from './styleMaps';
import { bsClass, bsSizes, getClassSet } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: React.PropTypes.string,
  /**
   * @private
   */
  standalone: deprecated(
    React.PropTypes.bool,
    'Use a `<FormControl>` or `<InputGroup>` directly.'
  ),
  validationState: React.PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * @private
   */
  bsStyle: deprecated(
    React.PropTypes.oneOf(['success', 'warning', 'error']),
    'Use `validationState`'
  ),
  /**
   * @private
   */
  hasFeedback: deprecated(
    React.PropTypes.bool,
    'Use a `<FormControl.Feedback>` element.'
  ),
  /**
   * @private
   */
  groupClassName: deprecated(React.PropTypes.string, 'Use `className`.'),
};

const childContextTypes = {
  $bs_formGroup: React.PropTypes.object.isRequired,
};

class FormGroup extends React.Component {
  getChildContext() {
    const { controlId, bsStyle, validationState = bsStyle } = this.props;

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
    const {
      standalone,
      bsStyle,
      validationState = bsStyle,
      groupClassName,
      className = groupClassName,
      children,
      hasFeedback = this.hasFeedback(children),
      ...props,
    } = this.props;

    delete props.bsClass;
    delete props.bsSize;
    delete props.controlId;

    const classes = {
      ...(!standalone && getClassSet(this.props)),
      'has-feedback': hasFeedback,
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div {...props} className={classNames(className, classes)}>
        {children}
      </div>
    );
  }
}

FormGroup.propTypes = propTypes;
FormGroup.childContextTypes = childContextTypes;

export default bsClass('form-group',
  bsSizes([Sizes.LARGE, Sizes.SMALL], FormGroup)
);
