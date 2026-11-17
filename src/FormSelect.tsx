import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import { useBootstrapPrefix } from './ThemeProvider.js';
import FormContext from './FormContext.js';

export interface FormSelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  /**
   * @default 'form-select'
   */
  bsPrefix?: string | undefined;

  /**
   * The size attribute of the underlying HTML element.
   * Specifies the number of visible options.
   */
  htmlSize?: number | undefined;

  /**
   * Size variants
   *
   * @type {('sm'|'lg')}
   */
  size?: 'sm' | 'lg' | undefined;

  /**
   * Make the control disabled
   */
  disabled?: boolean | undefined;

  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value?: string | string[] | number | undefined;

  /**
   * A callback fired when the `value` prop changes
   */
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;

  /**
   * Add "valid" validation styles to the control
   */
  isValid?: boolean | undefined;

  /**
   * Add "invalid" validation styles to the control and accompanying label
   */
  isInvalid?: boolean | undefined;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      bsPrefix,
      size,
      htmlSize,
      className,
      isValid = false,
      isInvalid = false,
      id,
      onPointerDown,
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-select');

    const handlePointerDown = useEventCallback(
      (event: React.PointerEvent<HTMLSelectElement>) => {
        onPointerDown?.(event);
        if (event.defaultPrevented) return;

        // Proactively blur the active editable element (such as an <input> or <textarea>)
        // before the native select menu opens. On mobile devices (particularly iOS WebKit),
        // opening a native select while the software keyboard is active causes the keyboard
        // dismissal to reflow the viewport asynchronously while the select popover is being
        // positioned, leading to the native dropdown menu detaching from the control.
        if (
          typeof document !== 'undefined' &&
          document.activeElement &&
          document.activeElement !== event.currentTarget &&
          (document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA' ||
            (document.activeElement as HTMLElement).isContentEditable)
        ) {
          (document.activeElement as HTMLElement).blur();
        }
      },
    );

    return (
      <select
        {...props}
        size={htmlSize}
        ref={ref}
        className={clsx(
          className,
          bsPrefix,
          size && `${bsPrefix}-${size}`,
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
        )}
        id={id || controlId}
        onPointerDown={handlePointerDown}
      />
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
