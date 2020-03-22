import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import { useUncontrolled } from 'uncontrollable';

import chainFunction from './createChainedFunction';
import { map } from './ElementChildren';
import ButtonGroup from './ButtonGroup';
import ToggleButton from './ToggleButton';

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

const ToggleButtonGroup = React.forwardRef((props, ref) => {
  let {
    children,
    type,
    name,
    value,
    onChange,
    ...controlledProps
  } = useUncontrolled(props, {
    value: 'onChange',
  });

  const getValues = () => (value == null ? [] : [].concat(value));

  const handleToggle = (inputVal, event) => {
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
    <ButtonGroup {...controlledProps} ref={ref} toggle>
      {map(children, (child) => {
        const values = getValues();
        const { value: childVal, onChange: childOnChange } = child.props;
        const handler = (e) => handleToggle(childVal, e);

        return React.cloneElement(child, {
          type,
          name: child.name || name,
          checked: values.indexOf(childVal) !== -1,
          onChange: chainFunction(childOnChange, handler),
        });
      })}
    </ButtonGroup>
  );
});

ToggleButtonGroup.propTypes = propTypes;
ToggleButtonGroup.defaultProps = defaultProps;

ToggleButtonGroup.Button = ToggleButton;

export default ToggleButtonGroup;
