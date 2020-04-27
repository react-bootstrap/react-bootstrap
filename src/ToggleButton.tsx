import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

import Button, { ButtonProps } from './Button';
import { BsPrefixComponent, BsPrefixComponentClass } from './helpers';

export interface ToggleButtonProps {
  type?: 'checkbox' | 'radio';
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<this>;
  value: unknown;
  inputRef?: React.LegacyRef<this>;
}

declare class ToggleButton<
  // Need to use BsPrefixComponentClass to get proper type checking.
  As extends React.ElementType = BsPrefixComponentClass<'button', ButtonProps>
> extends BsPrefixComponent<As, ToggleButtonProps> {}

const noop = () => {};

const propTypes = {
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

const ToggleButton = React.forwardRef(
  (
    {
      children,
      name,
      className,
      checked,
      type,
      onChange,
      value,
      disabled,
      inputRef,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback((e) => {
      if (e.target.tagName === 'INPUT') setFocused(true);
    }, []);

    const handleBlur = useCallback((e) => {
      if (e.target.tagName === 'INPUT') setFocused(false);
    }, []);

    return (
      <Button
        {...props}
        ref={ref}
        className={classNames(
          className,
          focused && 'focus',
          disabled && 'disabled',
        )}
        type={null}
        active={!!checked}
        as="label"
      >
        <input
          name={name}
          type={type}
          value={value}
          ref={inputRef}
          autoComplete="off"
          checked={!!checked}
          disabled={!!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange || noop}
        />

        {children}
      </Button>
    );
  },
);

ToggleButton.propTypes = propTypes;
ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
