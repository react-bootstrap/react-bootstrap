import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import FormGroup, { FormGroupProps } from './FormGroup';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FloatingLabelProps extends FormGroupProps, BsPrefixProps {
  controlId?: string;
  label: React.ReactNode;
}

const propTypes = {
  as: PropTypes.elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<label>`.
   */
  controlId: PropTypes.string,

  /**
   * Form control label.
   */
  label: PropTypes.node.isRequired,
};

const FloatingLabel: BsPrefixRefForwardingComponent<'div', FloatingLabelProps> =
  React.forwardRef(
    ({ bsPrefix, className, children, controlId, label, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');

      return (
        <FormGroup
          ref={ref}
          className={classNames(className, bsPrefix)}
          controlId={controlId}
          {...props}
        >
          {children}
          <label htmlFor={controlId}>{label}</label>
        </FormGroup>
      );
    },
  );

FloatingLabel.displayName = 'FloatingLabel';
FloatingLabel.propTypes = propTypes;

export default FloatingLabel;
