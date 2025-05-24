import clsx from 'clsx';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import Button, { type ButtonProps } from './Button';

export type ToggleButtonType = 'checkbox' | 'radio';

export interface ToggleButtonProps
  extends Omit<ButtonProps, 'onChange' | 'type'> {
  /**
   * @default 'btn-check'
   */
  bsPrefix?: string | undefined;

  /**
   * The `<input>` element `type`
   */
  type?: ToggleButtonType | undefined;

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name?: string | undefined;

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>` automatically
   */
  checked?: boolean | undefined;

  /**
   * The disabled state of both the label and input
   */
  disabled?: boolean | undefined;

  /**
   * `id` is required for button clicks to toggle input.
   */
  id: string;

  /**
   * A callback fired when the underlying input element changes. This is passed
   * directly to the `<input>` so shares the same signature as a native `onChange` event.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;

  /**
   * The value of the input, should be unique amongst its siblings when nested in a
   * `ToggleButtonGroup`.
   */
  value: string | ReadonlyArray<string> | number;

  /**
   * A ref attached to the `<input>` element
   */
  inputRef?: React.Ref<HTMLInputElement> | undefined;
}

const noop = () => undefined;

const ToggleButton = React.forwardRef<HTMLLabelElement, ToggleButtonProps>(
  (
    {
      bsPrefix,
      name,
      className,
      checked,
      type,
      onChange,
      value,
      disabled,
      id,
      inputRef,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'btn-check');

    return (
      <>
        <input
          className={bsPrefix}
          name={name}
          type={type}
          value={value}
          ref={inputRef}
          autoComplete="off"
          checked={!!checked}
          disabled={!!disabled}
          onChange={onChange || noop}
          id={id}
        />
        <Button
          {...props}
          ref={ref}
          className={clsx(className, disabled && 'disabled')}
          type={undefined}
          role={undefined}
          as="label"
          htmlFor={id}
        />
      </>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
