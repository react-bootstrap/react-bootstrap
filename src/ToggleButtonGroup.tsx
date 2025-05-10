import * as React from 'react';
import invariant from 'invariant';
import { useUncontrolled } from 'uncontrollable';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import chainFunction from './createChainedFunction';
import { map } from './ElementChildren';
import ButtonGroup, { type ButtonGroupProps } from './ButtonGroup';
import ToggleButton from './ToggleButton';

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

  invariant(
    type !== 'radio' || !!name,
    'A `name` is required to group the toggle buttons when the `type` ' +
      'is set to "radio"',
  );

  return (
    <ButtonGroup {...controlledProps} ref={ref as any} vertical={vertical}>
      {map(children, (child) => {
        const values = getValues();
        const { value: childVal, onChange: childOnChange } = child.props;
        const handler = (e) => handleToggle(childVal, e);

        return React.cloneElement(child, {
          type,
          name: (child as any).name || name,
          checked: values.indexOf(childVal) !== -1,
          onChange: chainFunction(childOnChange, handler),
        });
      })}
    </ButtonGroup>
  );
});

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

export default Object.assign(ToggleButtonGroup, {
  Button: ToggleButton,
});
