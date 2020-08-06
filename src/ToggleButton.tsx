import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import Button, { ButtonProps } from './Button';
import {
  BsPrefixAndClassNameOnlyProps,
  BsPrefixComponentClass,
} from './helpers';

export interface ToggleButtonProps
  extends ButtonProps,
    React.PropsWithChildren<BsPrefixAndClassNameOnlyProps> {
  type?: 'checkbox' | 'radio';
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: unknown;
  inputRef?: React.LegacyRef<'input'>;
}

type ToggleButton = BsPrefixComponentClass<'button', ToggleButtonProps>;

const noop = () => undefined;

const propTypes = {
  /**
   * @default 'btn-check'
   */
  bsPrefix: PropTypes.string,

  /**
   * The `<input>` element `type`
   */
  type: PropTypes.oneOf(['checkbox', 'radio']),

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: PropTypes.string,

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>` automatically
   */
  checked: PropTypes.bool,

  /**
   * The disabled state of both the label and input
   */
  disabled: PropTypes.bool,

  /**
   * `id` is required for button clicks to toggle input.
   */
  id: PropTypes.string.isRequired,

  /**
   * A callback fired when the underlying input element changes. This is passed
   * directly to the `<input>` so shares the same signature as a native `onChange` event.
   */
  onChange: PropTypes.func,

  /**
   * The value of the input, should be unique amongst it's siblings when nested in a
   * `ToggleButtonGroup`.
   */
  value: PropTypes.any.isRequired,

  /**
   * A ref attached to the `<input>` element
   * @type {ReactRef}
   */
  inputRef: PropTypes.any,
};

const ToggleButton = React.forwardRef<any, ToggleButtonProps>(
  (
    {
      bsPrefix,
      children,
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
    }: ToggleButtonProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'btn-check');

    return (
      <>
        <input
          className={bsPrefix}
          name={name}
          type={type}
          value={value as any}
          ref={inputRef as any}
          autoComplete="off"
          checked={!!checked}
          disabled={!!disabled}
          onChange={onChange || noop}
          id={id}
        />
        <Button
          {...props}
          ref={ref}
          className={classNames(className, disabled && 'disabled')}
          type={undefined}
          as="label"
          htmlFor={id}
        >
          {children}
        </Button>
      </>
    );
  },
);

ToggleButton.propTypes = propTypes as any;
ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
