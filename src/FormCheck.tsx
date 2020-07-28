import classNames from 'classnames';
import PropTypes from 'prop-types';
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
    Pick<React.HTMLAttributes<HTMLElement>, 'style'> {
  id?: string;
  inline?: boolean;
  disabled?: boolean;
  title?: string;
  label?: React.ReactNode;
  type?: FormCheckType;
  isValid?: boolean;
  isInvalid?: boolean;
  feedbackTooltip?: boolean;
  feedback?: React.ReactNode;
  bsSwitchPrefix?: string;
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
   * bsPrefix override for the base switch class.
   *
   * @default 'form-switch'
   */
  bsSwitchPrefix: PropTypes.string,

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

  /** A HTML id attribute, necessary for proper form accessibility. */
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

  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.node,

  /**
   * The type of checkable.
   * @type {('radio' | 'checkbox' | 'switch')}
   */
  type: PropTypes.oneOf(['radio', 'checkbox', 'switch']),

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
      bsSwitchPrefix,
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
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as = 'input',
      ...props
    }: FormCheckProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check');
    bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, 'form-switch');

    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
      }),
      [controlId, id],
    );

    const hasLabel = label != null && label !== false && !children;

    const input = (
      <FormCheckInput
        {...props}
        type={type === 'switch' ? 'checkbox' : type}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
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
            label && bsPrefix,
            inline && `${bsPrefix}-inline`,
            type === 'switch' && bsSwitchPrefix,
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
