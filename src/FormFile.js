import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import all from 'prop-types-extra/lib/all';
import Feedback from './Feedback';
import FormFileInput from './FormFileInput';
import FormFileLabel from './FormFileLabel';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-file'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file'
   */
  bsCustomPrefix: PropTypes.string,

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
   * Provide a function child to manually handle the layout of the FormFile's inner components.
   *
   * If not using the custom prop <code>FormFile.Label></code> should be before <code><FormFile.Input isInvalid /></code>
   * ```jsx
   * <FormFile>
   *   <FormFile.Label>Allow us to contact you?</FormFile.Label>
   *   <FormFile.Input isInvalid />
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormFile>
   * ```
   *
   * If using the custom prop <code><FormFile.Input isInvalid /></code> should be before <code>FormFile.Label></code>
   * ```jsx
   * <FormFile custom>
   *   <FormFile.Input isInvalid />
   *   <FormFile.Label>Allow us to contact you?</FormFile.Label>
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormFile>
   * ```
   */
  children: PropTypes.node,

  disabled: PropTypes.bool,
  label: PropTypes.node,

  /** Use Bootstrap's custom form elements to replace the browser defaults */
  custom: PropTypes.bool,

  /** Manually style the input as valid */
  isValid: PropTypes.bool.isRequired,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool.isRequired,

  /** Display feedback as a tooltip. */
  feedbackTooltip: PropTypes.bool,

  /** A message to display when the input is in a validation state */
  feedback: PropTypes.node,

  /**
   * The string for the "Browse" text label when using custom file input
   *
   * @type string
   */
  'data-browse': all(
    PropTypes.string,
    ({ custom, 'data-browse': dataBrowse }) =>
      dataBrowse && !custom
        ? Error(
            '`data-browse` attribute value will only be used when custom is `true`',
          )
        : null,
  ),

  /** The language for the button when using custom file input and SCSS based strings */
  lang: all(PropTypes.string, ({ custom, lang }) =>
    lang && !custom
      ? Error('`lang` can only be set when custom is `true`')
      : null,
  ),
};

const defaultProps = {
  disabled: false,
  isValid: false,
  isInvalid: false,
  feedbackTooltip: false,
};

const FormFile = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      bsCustomPrefix,
      disabled,
      isValid,
      isInvalid,
      feedbackTooltip,
      feedback,
      className,
      style,
      label,
      children,
      custom,
      lang,
      'data-browse': dataBrowse,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      inputAs = 'input',
      ...props
    },
    ref,
  ) => {
    const [prefix, defaultPrefix] = custom
      ? [bsCustomPrefix, 'custom']
      : [bsPrefix, 'form-file'];

    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);

    const type = 'file';
    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
        custom,
      }),
      [controlId, custom, id],
    );

    const hasLabel = label != null && label !== false && !children;

    const input = (
      <FormFileInput
        {...props}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
        disabled={disabled}
        as={inputAs}
        lang={lang}
      />
    );

    return (
      <FormContext.Provider value={innerFormContext}>
        <Component
          style={style}
          className={classNames(
            className,
            bsPrefix,
            custom && `custom-${type}`,
          )}
        >
          {children || (
            <>
              {custom ? (
                <>
                  {input}
                  {hasLabel && (
                    <FormFileLabel data-browse={dataBrowse}>
                      {label}
                    </FormFileLabel>
                  )}
                </>
              ) : (
                <>
                  {hasLabel && <FormFileLabel>{label}</FormFileLabel>}
                  {input}
                </>
              )}
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
);

FormFile.displayName = 'FormFile';
FormFile.propTypes = propTypes;
FormFile.defaultProps = defaultProps;

FormFile.Input = FormFileInput;
FormFile.Label = FormFileLabel;

export default FormFile;
