import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import { useUncontrolled } from 'uncontrollable';

import chainFunction from './createChainedFunction';
import { map } from './ElementChildren';
import ButtonGroup from './ButtonGroup';
import ToggleButton from './ToggleButton';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface ToggleButtonRadioProps<T> extends BsPrefixPropsWithChildren {
  type?: 'radio';
  name: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, event: any) => void;
}

export interface ToggleButtonCheckboxProps<T>
  extends BsPrefixPropsWithChildren {
  type: 'checkbox';
  name?: string;
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
}

export type ToggleButtonGroupProps<T> =
  | ToggleButtonRadioProps<T>
  | ToggleButtonCheckboxProps<T>;

type ToggleButtonGroup<T> = BsPrefixRefForwardingComponent<
  'a',
  ToggleButtonGroupProps<T>
> & {
  Button: typeof ToggleButton;
};

const propTypes = {
  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name: PropTypes.string,

  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value: PropTypes.any,

  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable values
   */
  onChange: PropTypes.func,

  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
};

const defaultProps = {
  type: 'radio',
};

const ToggleButtonGroup: ToggleButtonGroup<any> = (React.forwardRef(
  (props: ToggleButtonGroupProps<any>, ref) => {
    const {
      children,
      type,
      name,
      value,
      onChange,
      ...controlledProps
    } = useUncontrolled(props, {
      value: 'onChange',
    });

    const getValues: () => any[] = () =>
      value == null ? [] : [].concat(value);

    const handleToggle = (inputVal: any, event: any) => {
      if (!onChange) {
        return;
      }
      const values = getValues();
      const isActive = values.indexOf(inputVal) !== -1;

      if (type === 'radio') {
        if (!isActive && onChange) onChange(inputVal, event);
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
      <ButtonGroup {...controlledProps} ref={ref as any} toggle>
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
  },
) as unknown) as ToggleButtonGroup<any>;

ToggleButtonGroup.propTypes = propTypes;
ToggleButtonGroup.defaultProps = defaultProps as any;
ToggleButtonGroup.Button = ToggleButton;

export default ToggleButtonGroup;
