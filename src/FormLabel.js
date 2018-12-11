import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import Col from './Col';
import FormContext from './FormContext';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-label'
   */
  bsPrefix: PropTypes.string,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: PropTypes.string,

  /**
   * Renders the FormLabel as a `<Col>` component (accepting all the same props),
   * as well as adding additional styling for horizontal forms.
   */
  column: PropTypes.bool,

  /**
   * The FormLabel `ref` will be forwarded to the underlying element.
   * Unless the FormLabel is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  innerRef: PropTypes.any,

  /**
   * Hides the label visually while still allowing it to be
   * read by assistive technologies.
   */
  srOnly: PropTypes.bool,
};

const defaultProps = {
  column: false,
  srOnly: false,
};

function FormLabel({
  bsPrefix,
  column,
  srOnly,
  className,
  innerRef,
  ...props
}) {
  const classes = classNames(
    className,
    bsPrefix,
    srOnly && 'sr-only',
    column && 'col-form-label',
  );

  if (column) return <Col {...props} className={classes} as="label" />;

  // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
  return <label {...props} ref={innerRef} className={classes} />;
}

FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

const mapContext = ({ controlId }, { htmlFor }) => {
  warning(
    controlId == null || !htmlFor,
    '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.',
  );
  return {
    htmlFor: htmlFor || controlId,
  };
};

export default mapContextToProps(
  FormContext,
  mapContext,
  createBootstrapComponent(FormLabel, 'form-label'),
);
