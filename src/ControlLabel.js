import classNames from 'classnames';
import React from 'react';

import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: React.PropTypes.string,
  srOnly: React.PropTypes.bool,
};

const defaultProps = {
  srOnly: false,
};

const contextTypes = {
  $bs_formGroup: React.PropTypes.object,
};

class ControlLabel extends React.Component {
  getControlId(formGroup) {
    return formGroup && formGroup.controlId;
  }

  render() {
    const {
      htmlFor = this.getControlId(this.context.$bs_formGroup),
      srOnly,
      className,
      ...props,
    } = this.props;

    delete props.bsClass;

    const classes = {
      ...bootstrapUtils.getClassSet(this.props),
      'sr-only': srOnly,
    };

    return (
      <label
        {...props}
        htmlFor={htmlFor}
        className={classNames(className, classes)}
      />
    );
  }
}

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextTypes = contextTypes;

export default bsClass('control-label', ControlLabel);
