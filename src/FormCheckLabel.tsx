import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';

import { BsPrefixProps } from './helpers';

export interface FormCheckLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    BsPrefixProps {
  bsCustomPrefix?: string;
}

const propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-control'
   */
  bsCustomPrefix: PropTypes.string,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: PropTypes.string,
};

const FormCheckLabel = React.forwardRef<HTMLLabelElement, FormCheckLabelProps>(
  ({ bsPrefix, bsCustomPrefix, className, htmlFor, ...props }, ref) => {
    const { controlId, custom } = useContext(FormContext);
    const [prefix, defaultPrefix] = custom
      ? [bsCustomPrefix, 'custom-control-label']
      : [bsPrefix, 'form-check-label'];

    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
    const classNames = useClassNameMapper();

    return (
      <label // eslint-disable-line jsx-a11y/label-has-associated-control
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={classNames(className, bsPrefix)}
      />
    );
  },
);

FormCheckLabel.displayName = 'FormCheckLabel';
FormCheckLabel.propTypes = propTypes;

export default FormCheckLabel;
