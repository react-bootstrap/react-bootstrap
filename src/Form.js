import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import createWithBsPrefix from './utils/createWithBsPrefix';
import { createBootstrapComponent } from './ThemeProvider';
import FormGroup from './FormGroup';
import FormControl from './FormControl';
import FormCheck from './FormCheck';
import FormLabel from './FormLabel';
import FormText from './FormText';

const propTypes = {
  /**
   * @default {'form'}
   */
  bsPrefix: PropTypes.string,

  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  innerRef: PropTypes.any,

  /**
   * Display the series of labels, form controls,
   * and buttons on a single horizontal row
   */
  inline: PropTypes.bool,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: PropTypes.bool,
  as: elementType,
};

const defaultProps = {
  inline: false,
  as: 'form',
};

function Form({
  bsPrefix,
  inline,
  className,
  innerRef,
  validated,
  as: Component,
  ...props
}) {
  return (
    <Component
      {...props}
      ref={innerRef}
      className={classNames(
        className,
        validated && 'was-validated',
        inline && `${bsPrefix}-inline`,
      )}
    />
  );
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

const DecoratedForm = createBootstrapComponent(Form, 'form');

DecoratedForm.Row = createWithBsPrefix('form-row');
DecoratedForm.Group = FormGroup;
DecoratedForm.Control = FormControl;
DecoratedForm.Check = FormCheck;
DecoratedForm.Label = FormLabel;
DecoratedForm.Text = FormText;

export default DecoratedForm;
