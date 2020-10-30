import classNames from 'classnames';
import PropTypes from 'prop-types';
import all from 'prop-types-extra/lib/all';
import React, { useContext, useMemo } from 'react';
import Feedback from './Feedback';
import FormCheckInput from './FormCheckInput';
import FormCheckLabel from './FormCheckLabel';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export type FormCheckType = 'checkbox' | 'radio' | 'switch';

export interface FormCheckProps
  extends BsPrefixPropsWithChildren,
    React.InputHTMLAttributes<HTMLInputElement> {
  bsCustomPrefix?: string;
  inline?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  custom?: boolean;
  type?: FormCheckType;
  isValid?: boolean;
  isInvalid?: boolean;
  feedbackTooltip?: boolean;
  feedback?: React.ReactNode;
}

type FormCheck = BsPrefixRefForwardingComponent<'input', FormCheckProps> & {
  Input: typeof FormCheckInput;
  Label: typeof FormCheckLabel;
};

const propTypes = {
  /**
   * @default 'form-check'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-control'
   */
  bsCustomPrefix: PropTypes.string,

  /**
   * The FormCheck `ref` will be forwarded to the underlying input element,
   * which means it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * The underlying HTML element to use when rendering the FormCheck.
   *
   * @type {('input'|elementType)}
   */
  as: PropTypes.elementType,

  /**
   * A HTML id attribute, necessary for proper form accessibility.
   * An id is recommended for allowing label clicks to toggle the check control.
   *
   * This is **required** for custom check controls or when `type="switch"` due to
   * how they are rendered.
   */
  id: PropTypes.string,

  /**
   * Provide a function child to manually handle the layout of the FormCheck's inner components.
   *
   * ```jsx
   * <FormCheck>
   *   <FormCheck.Input isInvalid type={radio} />
   *   <FormCheck.Label>Allow us to contact you?</FormCheck.Label>
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormCheck>
   * ```
   */
  children: PropTypes.node,

  /**
   * Groups controls horizontally with other `FormCheck`s.
   */
  inline: PropTypes.bool,

  /**
   * Disables the control.
   */
  disabled: PropTypes.bool,

  /**
   * `title` attribute for the underlying `FormCheckLabel`.
   */
  title: PropTypes.string,

  /**
   * Label for the control.
   */
  label: PropTypes.node,

  /** Use Bootstrap's custom form elements to replace the browser defaults */
  custom: all(PropTypes.bool, ({ custom, id }) =>
    custom && !id ? Error('Custom check controls require an id to work') : null,
  ),

  /**
   * The type of checkable.
   * @type {('radio' | 'checkbox' | 'switch')}
   */
  type: all(
    PropTypes.oneOf(['radio', 'checkbox', 'switch']).isRequired,
    ({ type, custom }) =>
      type === 'switch' && custom === false
        ? Error('`custom` cannot be set to `false` when the type is `switch`')
        : null,
    ({ type, id }) =>
      type === 'switch' && !id
        ? Error('`id` must be defined when the type is `switch`')
        : null,
  ),

  /** Manually style the input as valid */
  isValid: PropTypes.bool,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool,

  /** Display feedback as a tooltip. */
  feedbackTooltip: PropTypes.bool,

  /** A message to display when the input is in a validation state */
  feedback: PropTypes.node,
};

const FormCheck: FormCheck = (React.forwardRef(
  (
    {
      id,
      bsPrefix,
      bsCustomPrefix,
      inline = false,
      disabled = false,
      isValid = false,
      isInvalid = false,
      feedbackTooltip = false,
      feedback,
      className,
      style,
      title = '',
      type = 'checkbox',
      label,
      children,
      custom: propCustom,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as = 'input',
      ...props
    }: FormCheckProps,
    ref,
  ) => {
    const custom = type === 'switch' ? true : propCustom;
    const [prefix, defaultPrefix] = custom
      ? [bsCustomPrefix, 'custom-control']
      : [bsPrefix, 'form-check'];

    bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);

    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
        custom,
      }),
      [controlId, custom, id],
    );

    const hasLabel = custom || (label != null && label !== false && !children);

    const input = (
      <FormCheckInput
        {...props}
        type={type === 'switch' ? 'checkbox' : type}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
        isStatic={!hasLabel}
        disabled={disabled}
        as={as}
      />
    );

    return (
      <FormContext.Provider value={innerFormContext}>
        <div
          style={style}
          className={classNames(
            className,
            bsPrefix,
            custom && `custom-${type}`,
            inline && `${bsPrefix}-inline`,
          )}
        >
          {children || (
            <>
              {input}
              {hasLabel && (
                <FormCheckLabel title={title}>{label}</FormCheckLabel>
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
        </div>
      </FormContext.Provider>
    );
  },
) as unknown) as FormCheck;

FormCheck.displayName = 'FormCheck';
FormCheck.propTypes = propTypes;

FormCheck.Input = FormCheckInput;
FormCheck.Label = FormCheckLabel;

export default FormCheck;
