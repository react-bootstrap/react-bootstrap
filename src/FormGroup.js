import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import React from 'react';

import FormContext from './FormContext';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-group'
   */
  bsPrefix: PropTypes.string,

  as: elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,

  /**
   * The FormGroup `ref` will be forwarded to the underlying element.
   * Unless the FormGroup is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  innerRef: PropTypes.any,
};

const defaultProps = {
  as: 'div',
};

function FormGroup({
  bsPrefix,
  innerRef,
  className,
  children,
  controlId,
  as: Component,
  ...props
}) {
  return (
    <FormContext.Provider value={{ controlId }}>
      <Component
        {...props}
        ref={innerRef}
        className={classNames(className, bsPrefix)}
      >
        {children}
      </Component>
    </FormContext.Provider>
  );
}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;

export default createBootstrapComponent(FormGroup, 'form-group');
