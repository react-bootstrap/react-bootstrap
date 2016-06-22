import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet } from './utils/bootstrapUtils';

import Glyphicon from './Glyphicon';

const defaultProps = {
  bsRole: 'feedback',
};

const contextTypes = {
  $bs_formGroup: React.PropTypes.object,
};

class FormControlFeedback extends React.Component {
  getGlyph(validationState) {
    switch (validationState) {
    case 'success': return 'ok';
    case 'warning': return 'warning-sign';
    case 'error': return 'remove';
    default: return null;
    }
  }

  renderDefaultFeedback(formGroup, className, classes, props) {
    const glyph = this.getGlyph(formGroup && formGroup.validationState);
    if (!glyph) {
      return null;
    }

    return (
      <Glyphicon
        {...props}
        glyph={glyph}
        className={classNames(className, classes)}
      />
    );
  }

  render() {
    const { className, children, ...props } = this.props;
    delete props.bsClass;

    const classes = getClassSet(this.props);

    if (!children) {
      return this.renderDefaultFeedback(
        this.context.$bs_formGroup, className, classes, props
      );
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ...props,
      className: classNames(child.props.className, className, classes),
    });
  }
}

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

export default bsClass('form-control-feedback', FormControlFeedback);
