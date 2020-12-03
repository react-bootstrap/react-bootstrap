import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';

import {
  BsCustomPrefixProps,
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface FormFileLabelProps extends BsPrefixProps, BsCustomPrefixProps {
  htmlFor?: string;
}
type FormFileLabel = BsPrefixRefForwardingComponent<
  'label',
  FormFileLabelProps
>;

const propTypes = {
  /**
   * @default 'form-file-input'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file-label'
   */
  bsCustomPrefix: PropTypes.string,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: PropTypes.string,

  /** The string for the "Browse" text label when using custom file input */
  'data-browse': PropTypes.string,
};

const FormFileLabel: FormFileLabel = React.forwardRef<
  HTMLLabelElement,
  FormFileLabelProps
>(({ bsPrefix, bsCustomPrefix, className, htmlFor, ...props }, ref) => {
  const { controlId, custom } = useContext(FormContext);
  const [prefix, defaultPrefix] = custom
    ? [bsCustomPrefix, 'custom-file-label']
    : [bsPrefix, 'form-file-label'];

  const classNames = useClassNameMapper();
  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);

  return (
    <label // eslint-disable-line jsx-a11y/label-has-associated-control
      {...props}
      ref={ref}
      htmlFor={htmlFor || controlId}
      className={classNames(className, bsPrefix)}
      data-browse={props['data-browse']}
    />
  );
});

FormFileLabel.displayName = 'FormFileLabel';
FormFileLabel.propTypes = propTypes;

export default FormFileLabel;
