import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from './Glyphicon';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const defaultProps = {
  bsRole: 'feedback',
};

const contextTypes = {
  $bs_formGroup: PropTypes.object,
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

  renderDefaultFeedback(formGroup, className, classes, elementProps) {
    const glyph = this.getGlyph(formGroup && formGroup.validationState);
    if (!glyph) {
      return null;
    }

    return (
      <Glyphicon
        {...elementProps}
        glyph={glyph}
        className={classNames(className, classes)}
      />
    );
  }

  render() {
    const { className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    if (!children) {
      return this.renderDefaultFeedback(
        this.context.$bs_formGroup, className, classes, elementProps
      );
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ...elementProps,
      className: classNames(child.props.className, className, classes),
    });
  }
}

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

export default bsClass('form-control-feedback', FormControlFeedback);
