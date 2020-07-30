import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import Feedback from './Feedback';
import FormFileButton from './FormFileButton';
import FormFileInput from './FormFileInput';
import FormFileLabel from './FormFileLabel';
import FormFileText from './FormFileText';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface FormFileProps
  extends BsPrefixPropsWithChildren,
    Pick<React.HTMLAttributes<HTMLElement>, 'style'> {
  inputAs?: React.ElementType;
  id?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  button?: React.ReactNode;
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: React.ReactNode;
  feedbackTooltip?: boolean;
  size?: 'sm' | 'lg';
}

type FormFile = BsPrefixRefForwardingComponent<'input', FormFileProps> & {
  Button: typeof FormFileButton;
  Input: typeof FormFileInput;
  Label: typeof FormFileLabel;
  Text: typeof FormFileText;
};

const propTypes = {
  /**
   * @default 'form-file'
   */
  bsPrefix: PropTypes.string,

  /**
   * The wrapping HTML element to use when rendering the FormFile.
   *
   * @type {('div'|elementType)}
   */
  as: PropTypes.elementType,

  /**
   * The underlying HTML element to use when rendering the FormFile.
   *
   * @type {('input'|elementType)}
   */
  inputAs: PropTypes.elementType,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string,

  /**
   * Provide a function child to manually handle the layout of the FormFile's
   * inner components.
   *
   * ```jsx
   * <FormFile>
   *   <FormFile.Input isInvalid />
   *   <FormFile.Label>
   *     <FormFile.Text>Select file</FormFile.Text>
   *     <FormFile.Button>Browse</FormFile.Button>
   *   </FormFile.Label>
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormFile>
   * ```
   */
  children: PropTypes.node,

  /** Make the control disabled */
  disabled: PropTypes.bool,

  /** The node for the input text */
  label: PropTypes.node,

  /** The node for the "Browse" button label */
  button: PropTypes.node,

  /** Manually style the input as valid */
  isValid: PropTypes.bool,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool,

  /** Display feedback as a tooltip. */
  feedbackTooltip: PropTypes.bool,

  /** A message to display when the input is in a validation state */
  feedback: PropTypes.node,

  /** Size of the input */
  size: PropTypes.string,
};

const FormFile: FormFile = (React.forwardRef(
  (
    {
      id,
      bsPrefix,
      disabled = false,
      isValid = false,
      isInvalid = false,
      feedbackTooltip = false,
      feedback,
      buttonText,
      className,
      style,
      label,
      size,
      children,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      inputAs = 'input',
      ...props
    }: FormFileProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-file');

    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
      }),
      [controlId, id],
    );

    return (
      <FormContext.Provider value={innerFormContext}>
        <Component
          style={style}
          className={classNames(
            className,
            bsPrefix,
            size && `${bsPrefix}-${size}`,
          )}
        >
          {children || (
            <>
              <FormFileInput
                {...props}
                ref={ref}
                isValid={isValid}
                isInvalid={isInvalid}
                disabled={disabled}
                as={inputAs}
              />
              <FormFileLabel label={label} buttonText={buttonText} />
              {(isValid || isInvalid) && (
                <Feedback
                  type={isValid ? 'valid' : 'invalid'}
                  tooltip={feedbackTooltip}
                >
                  {feedback}
                </Feedback>
              )}
            </>
          )}
        </Component>
      </FormContext.Provider>
    );
  },
) as unknown) as FormFile;

FormFile.displayName = 'FormFile';
FormFile.propTypes = propTypes;

FormFile.Button = FormFileButton;
FormFile.Input = FormFileInput;
FormFile.Label = FormFileLabel;
FormFile.Text = FormFileText;

export default FormFile;
