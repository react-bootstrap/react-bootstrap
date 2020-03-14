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
  column: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['sm', 'lg'])]),

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

  /** Set a custom element for this component */
  as: PropTypes.elementType,
};

const defaultProps = {
  column: false,
  srOnly: false,
};

const FormLabel = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'label',
      bsPrefix,
      column,
      srOnly,
      className,
      htmlFor,
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);

    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');

    let columnClass = 'col-form-label';
    if (typeof column === 'string') columnClass = `${columnClass}-${column}`;
    const classes = classNames(
      className,
      bsPrefix,
      srOnly && 'sr-only',
      column && columnClass,
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
      <Component ref={ref} className={classes} htmlFor={htmlFor} {...props} />
    );
  },
);

FormLabel.displayName = 'FormLabel';
FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

export default FormLabel;
