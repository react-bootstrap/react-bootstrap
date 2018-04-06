import classNames from 'classnames';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import React from 'react';

import {
  bsClass,
  bsSizes,
  getClassSet,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  as: elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,
  validationState: PropTypes.oneOf(['success', 'warning', 'error', null])
};

const defaultProps = {
  as: 'div'
};

const childContextTypes = {
  $bs_formGroup: PropTypes.object.isRequired
};

class FormGroup extends React.Component {
  getChildContext() {
    const { controlId, validationState } = this.props;

    return {
      $bs_formGroup: {
        controlId,
        validationState
      }
    };
  }

  hasFeedback(children) {
    return ValidComponentChildren.some(
      children,
      child =>
        child.props.bsRole === 'feedback' ||
        (child.props.children && this.hasFeedback(child.props.children))
    );
  }

  render() {
    const {
      as: Component,
      validationState,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['controlId']);

    const classes = {
      ...getClassSet(bsProps),
      'has-feedback': this.hasFeedback(children)
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <Component {...elementProps} className={classNames(className, classes)}>
        {children}
      </Component>
    );
  }
}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;
FormGroup.childContextTypes = childContextTypes;

export default bsClass(
  'form-group',
  bsSizes([Size.LARGE, Size.SMALL], FormGroup)
);
