import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import Col from './Col';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: PropTypes.string,
  column: PropTypes.bool,
  srOnly: PropTypes.bool
};

const defaultProps = {
  column: false,
  srOnly: false
};

const contextTypes = {
  $bs_formGroup: PropTypes.object
};

class FormLabel extends React.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;

    const {
      column,
      htmlFor = controlId,
      srOnly,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || htmlFor === controlId,
      '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.'
    );

    const classes = {
      ...getClassSet(bsProps),
      'sr-only': srOnly
    };

    if (column) {
      return (
        <Col
          {...elementProps}
          as="label"
          htmlFor={htmlFor}
          className={classNames(className, 'col-form-label', classes)}
        />
      );
    }
    return (
      <label
        {...elementProps}
        htmlFor={htmlFor}
        className={classNames(className, classes)}
      />
    );
  }
}

FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;
FormLabel.contextTypes = contextTypes;

export default bsClass('form-label', FormLabel);
