import classNames from 'classnames';
import React from 'react';
import warning from 'warning';

import { bsClass, getClassSet } from './utils/bootstrapUtils';

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
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const {
      htmlFor = controlId,
      srOnly,
      className,
      ...props,
    } = this.props;

    warning(
      controlId == null || htmlFor === controlId,
      '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.'
    );

    delete props.bsClass;

    const classes = {
      ...getClassSet(this.props),
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
