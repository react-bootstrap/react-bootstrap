import * as React from 'react';
import invariant from 'invariant';
import { useUncontrolled } from 'uncontrollable';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import chainFunction from './createChainedFunction.js';
import { map } from './ElementChildren.js';
import ButtonGroup, { type ButtonGroupProps } from './ButtonGroup.js';
import ToggleButton from './ToggleButton.js';

type BaseToggleButtonProps = Omit<
  ButtonGroupProps,
  'toggle' | 'defaultValue' | 'onChange'
>;

export interface ToggleButtonRadioProps<T> extends BaseToggleButtonProps {
  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type?: 'radio';

  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name: string;

  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value?: T;

  /**
   * The default value, or array of values, of the active (pressed) buttons
   */
  defaultValue?: T;

  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable value
   */
  onChange?: (value: T, event: any) => void;
}

export interface ToggleButtonCheckboxProps<T> extends BaseToggleButtonProps {
  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: 'checkbox';

  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name?: string;

  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value?: T[];

  /**
   * The default value, or array of values, of the active (pressed) buttons
   */
  defaultValue?: T[];

  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable value
   */
  onChange?: (value: T[]) => void;
}

export type ToggleButtonGroupProps<T> =
  | ToggleButtonRadioProps<T>
  | ToggleButtonCheckboxProps<T>;

const ToggleButtonGroup: DynamicRefForwardingComponent<
  'a',
  ToggleButtonGroupProps<any>
> = React.forwardRef<HTMLElement, ToggleButtonGroupProps<any>>((props, ref) => {
  const {
    children,
    type = 'radio',
    name,
    value,
    onChange,
    vertical = false,
    onKeyDown,
    ...controlledProps
  } = useUncontrolled(props, {
    value: 'onChange',
  });

  const getValues: () => any[] = () => (value == null ? [] : [].concat(value));

  const handleToggle = (inputVal: any, event: any) => {
    if (!onChange) {
      return;
    }
    const values = getValues();
    const isActive = values.indexOf(inputVal) !== -1;

    if (type === 'radio') {
      if (!isActive) onChange(inputVal, event);
      return;
    }

    if (isActive) {
      onChange(
        values.filter((n) => n !== inputVal),
        event,
      );
    } else {
      onChange([...values, inputVal], event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (type === 'radio') {
      const childValues = React.Children.map(
        children,
        (child: any) => child?.props?.value,
      );
      if (!childValues) {
        onKeyDown?.(event);
        return;
      }

      const currentIndex = childValues.indexOf(value);
      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % childValues.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex =
            (currentIndex - 1 + childValues.length) % childValues.length;
          break;
        default:
          onKeyDown?.(event);
          return;
      }

      event.preventDefault();
      if (nextIndex !== currentIndex && childValues[nextIndex] !== undefined) {
        onChange?.(childValues[nextIndex], event);
      }
    }
    onKeyDown?.(event);
  };

  invariant(
    type !== 'radio' || !!name,
    'A `name` is required to group the toggle buttons when the `type` ' +
      'is set to "radio"',
  );

  return (
    <ButtonGroup
      {...controlledProps}
      ref={ref as any}
      vertical={vertical}
      onKeyDown={handleKeyDown}
    >
      {map(children, (child) => {
        const values = getValues();
        const { value: childVal, onChange: childOnChange } = child.props;
        const handler = (e) => handleToggle(childVal, e);
        const isChecked = values.indexOf(childVal) !== -1;

        return React.cloneElement(child, {
          type,
          name: (child as any).name || name,
          checked: isChecked,
          onChange: chainFunction(childOnChange, handler),
          tabIndex: type === 'radio' ? (isChecked ? 0 : -1) : undefined,
        });
      })}
    </ButtonGroup>
  );
});

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

export default Object.assign(ToggleButtonGroup, {
  Button: ToggleButton,
});
