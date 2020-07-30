import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FormContext from './FormContext';
import FormFileButton from './FormFileButton';
import FormFileText from './FormFileText';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixAndClassNameOnlyProps,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface FormFileLabelProps extends BsPrefixAndClassNameOnlyProps {
  htmlFor?: string;
  label?: React.ReactNode;
  button?: React.ReactNode;
}
type FormFileLabel = BsPrefixRefForwardingComponent<
  'label',
  FormFileLabelProps
>;

const propTypes = {
  /**
   * @default 'form-file-label'
   */
  bsPrefix: PropTypes.string,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: PropTypes.string,

  /** The node for the "Choose file..." label */
  label: PropTypes.node,

  /** The node for the "Browse" label */
  button: PropTypes.node,
};

const FormFileLabel: FormFileLabel = React.forwardRef<
  HTMLLabelElement,
  FormFileLabelProps
>(
  (
    {
      bsPrefix,
      className,
      htmlFor,
      label = 'Choose file...',
      button = 'Browse',
      children,
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-file-label');

    return (
      <label // eslint-disable-line jsx-a11y/label-has-associated-control
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={classNames(className, bsPrefix)}
      >
        {children || (
          <>
            <FormFileText>{label}</FormFileText>
            <FormFileButton>{button}</FormFileButton>
          </>
        )}
      </label>
    );
  },
);

FormFileLabel.displayName = 'FormFileLabel';
FormFileLabel.propTypes = propTypes;

export default FormFileLabel;
