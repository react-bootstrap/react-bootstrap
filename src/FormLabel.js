import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import warning from 'warning';

import Col from './Col';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

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
  _ref: PropTypes.any,

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

const FormLabel = React.forwardRef(
  ({ bsPrefix, column, srOnly, className, htmlFor, ...props }, ref) => {
    const { controlId } = useContext(FormContext);

    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');

    const classes = classNames(
      className,
      bsPrefix,
      srOnly && 'sr-only',
      column && 'col-form-label',
    );

    warning(
      controlId == null || !htmlFor,
      '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.',
    );
    htmlFor = htmlFor || controlId;

    if (column)
      return (
        <Col as="label" className={classes} htmlFor={htmlFor} {...props} />
      );

    return (
      // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
      <label ref={ref} className={classes} htmlFor={htmlFor} {...props} />
    );
  },
);

FormLabel.displayName = 'FormLabel';
FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

export default FormLabel;
