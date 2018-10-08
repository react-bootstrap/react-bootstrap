import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import uncontrollable from 'uncontrollable';

import chainFunction from './utils/createChainedFunction';
import { map } from './utils/ElementChildren';
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

class ToggleButtonGroup extends React.Component {
  getValues() {
    const { value } = this.props;
    return value == null ? [] : [].concat(value);
  }

  handleToggle(value, event) {
    const { type, onChange } = this.props;
    const values = this.getValues();
    const isActive = values.indexOf(value) !== -1;

    if (type === 'radio') {
      if (!isActive) onChange(value, event);
      return;
    }

    if (isActive) {
      onChange(values.filter(n => n !== value), event);
    } else {
      onChange([...values, value], event);
    }
  }

  render() {
    const { children, type, name, ...props } = this.props;

    delete props.onChange;
    delete props.value;

    const values = this.getValues();

    invariant(
      type !== 'radio' || !!name,
      'A `name` is required to group the toggle buttons when the `type` ' +
        'is set to "radio"',
    );

    return (
      <ButtonGroup {...props} toggle>
        {map(children, child => {
          const { value, onChange } = child.props;
          const handler = e => this.handleToggle(value, e);

          return React.cloneElement(child, {
            type,
            name: child.name || name,
            checked: values.indexOf(value) !== -1,
            onChange: chainFunction(onChange, handler),
          });
        })}
      </ButtonGroup>
    );
  }
}

ToggleButtonGroup.propTypes = propTypes;
ToggleButtonGroup.defaultProps = defaultProps;

const UncontrolledToggleButtonGroup = uncontrollable(ToggleButtonGroup, {
  value: 'onChange',
});

UncontrolledToggleButtonGroup.Button = ToggleButton;

export default UncontrolledToggleButtonGroup;
