import clsx from 'clsx';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import Feedback, { type FeedbackType } from './Feedback.js';
import FormCheckInput from './FormCheckInput.js';
import FormCheckLabel from './FormCheckLabel.js';
import FormContext from './FormContext.js';
import { useBootstrapPrefix } from './ThemeProvider.js';
import { hasChildOfType } from './ElementChildren.js';

export type FormCheckType = 'checkbox' | 'radio' | 'switch';

export interface FormCheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'form-check'
   */
  bsPrefix?: string | undefined;

  /**
   * bsPrefix override for the base switch class.
   *
   * @default 'form-switch'
   */
  bsSwitchPrefix?: string | undefined;

  /**
   * A HTML id attribute, necessary for proper form accessibility.
   * An id is recommended for allowing label clicks to toggle the check control.
   *
   * This is **required** when `type="switch"` due to how they are rendered.
   */
  id?: string | undefined;

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
  children?: React.ReactNode | undefined;

  /**
   * Groups controls horizontally with other `FormCheck`s.
   */
  inline?: boolean | undefined;

  /**
   * Put your checkboxes, radios, and switches on the opposite side.
   */
  reverse?: boolean | undefined;

  /**
   * Disables the control.
   */
  disabled?: boolean | undefined;

  /**
   * `title` attribute for the underlying `FormCheckLabel`.
   */
  title?: string | undefined;

  /**
   * Label for the control.
   */
  label?: React.ReactNode | undefined;

  /**
   * The type of checkable.
   */
  type?: FormCheckType | undefined;

  /**
   * Manually style the input as valid
   */
  isValid?: boolean | undefined;

  /**
   * Manually style the input as invalid
   */
  isInvalid?: boolean;

  /**
   * Display feedback as a tooltip.
   */
  feedbackTooltip?: boolean | undefined;

  /**
   * A message to display when the input is in a validation state
   */
  feedback?: React.ReactNode | undefined;

  /**
   * Specify whether the feedback is for valid or invalid fields
   */
  feedbackType?: FeedbackType | undefined;
}

const FormCheck: DynamicRefForwardingComponent<'input', FormCheckProps> =
  React.forwardRef<HTMLInputElement, FormCheckProps>(
    (
      {
        id,
        bsPrefix,
        bsSwitchPrefix,
        inline = false,
        reverse = false,
        disabled = false,
        isValid = false,
        isInvalid = false,
        feedbackTooltip = false,
        feedback,
        feedbackType,
        className,
        style,
        title = '',
        type = 'checkbox',
        label,
        children,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as = 'input',
        ...props
      },
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

      const hasLabel =
        (!children && label != null && label !== false) ||
        hasChildOfType(children, FormCheckLabel);

      const input = (
        <FormCheckInput
          {...props}
          type={type === 'switch' ? 'checkbox' : type}
          ref={ref}
          isValid={isValid}
          isInvalid={isInvalid}
          disabled={disabled}
          as={as}
          // add title to input directly if we are not 
          // rendering the label alongside it
          title={hasLabel ? undefined : title}
        />
      );

      return (
        <FormContext.Provider value={innerFormContext}>
          <div
            style={style}
            className={clsx(
              className,
              hasLabel && bsPrefix,
              inline && `${bsPrefix}-inline`,
              reverse && `${bsPrefix}-reverse`,
              type === 'switch' && bsSwitchPrefix,
            )}
          >
            {children || (
              <>
                {input}
                {hasLabel && (
                  <FormCheckLabel title={title}>{label}</FormCheckLabel>
                )}
                {feedback && (
                  <Feedback type={feedbackType} tooltip={feedbackTooltip}>
                    {feedback}
                  </Feedback>
                )}
              </>
            )}
          </div>
        </FormContext.Provider>
      );
    },
  );

FormCheck.displayName = 'FormCheck';

export default Object.assign(FormCheck, {
  Input: FormCheckInput,
  Label: FormCheckLabel,
});
