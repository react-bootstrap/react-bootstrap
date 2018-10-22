import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';
import FormContext from './FormContext';

const propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: PropTypes.string,

  /**
   * @private
   */
  innerRef: PropTypes.any,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: PropTypes.string,
};

const defaultProps = {
  type: 'checkbox',
};

function FormCheckLabel({ bsPrefix, className, innerRef, htmlFor, ...props }) {
  return (
    <FormContext.Consumer>
      {({ controlId, custom }) => (
        <label // eslint-disable-line jsx-a11y/label-has-associated-control
          {...props}
          ref={innerRef}
          htmlFor={htmlFor || controlId}
          className={classNames(
            className,
            !custom && bsPrefix,
            custom && 'custom-control-label',
          )}
        />
      )}
    </FormContext.Consumer>
  );
}

FormCheckLabel.propTypes = propTypes;
FormCheckLabel.defaultProps = defaultProps;

export default createBootstrapComponent(FormCheckLabel, 'form-check-label');
