import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import uncontrollable from 'uncontrollable';

import chainFunction from './utils/createChainedFunction';
import ValidChildren from './utils/ValidComponentChildren';
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

  handleToggle(value) {
    const { type, onChange } = this.props;
    const values = this.getValues();
    const isActive = values.includes(value);

    if (type === 'radio') {
      if (!isActive) {
        onChange(value);
      }
      return;
    }

    if (isActive) {
      onChange(values.filter(n => n !== value));
    } else {
      onChange([...values, value]);
    }
  }

  render() {
    const { children, type, name } = this.props;

    const values = this.getValues();

    invariant(type !== 'radio' || !!name,
      'A `name` is required to group the toggle buttons when the `type` ' +
      'is set to "radio"'
    );

    // the data attribute is required b/c twbs css uses it in the selector
    return (
      <ButtonGroup data-toggle="buttons">
        {ValidChildren.map(children, child => {
          const { value, onChange } = child.props;
          const handler = () => this.handleToggle(value);

          return React.cloneElement(child, {
            type,
            name: child.name || name,
            checked: values.includes(value),
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
