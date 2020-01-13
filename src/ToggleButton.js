import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import { useUncontrolled } from 'uncontrollable';
import Button from './Button';

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
   *
   * @controllable onChange
   */
  checked: PropTypes.bool,

  /**
   * The disabled state of both the label and input
   */
  disabled: PropTypes.bool,

  /**
   * A callback fired when the underlying input element changes. This is passed
   * directly to the `<input>` so shares the same signature as a native `onChange` event.
   *
   * @controllable  checked
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

  /**
   * The defaultChecked state of the input
   */
  defaultChecked: PropTypes.bool,
};

const ToggleButton = React.forwardRef((props, ref) => {
  let {
    children,
    name,
    className,
    checked,
    type,
    onChange,
    value,
    disabled,
    inputRef,
    ...controlledProps
  } = useUncontrolled(props, {
    checked: 'onChange',
  });

  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(e => {
    if (e.target.tagName === 'INPUT') setFocused(true);
  }, []);

  const handleBlur = useCallback(e => {
    if (e.target.tagName === 'INPUT') setFocused(false);
  }, []);

  return (
    <Button
      {...controlledProps}
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
        onChange={onChange}
      />

      {children}
    </Button>
  );
});

ToggleButton.propTypes = propTypes;
ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
