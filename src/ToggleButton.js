import React from 'react';

import Button from './Button';

const propTypes = {
  /**
   * The `<input>` `type`
   * @type {[type]}
   */
  type: React.PropTypes.oneOf(['checkbox', 'radio']),

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: React.PropTypes.string,

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>`` automatically
   */
  checked: React.PropTypes.bool,

  /**
   * [onChange description]
   */
  onChange: React.PropTypes.func,
  /**
   * The value of the input, and unique identifier in the ToggleButtonGroup
   */
  value: React.PropTypes.any.isRequired,
};

class ToggleButton extends React.Component {
  render() {
    const {
      children, name, checked, type, onChange, value, ...props } = this.props;

    return (
      <Button
        {...props}
        active={!!checked}
        componentClass="label"
      >
        <input
          name={name}
          type={type}
          autoComplete="off"
          value={value}
          checked={!!checked}
          onChange={onChange}
        />

        {children}
      </Button>
    );
  }
}

ToggleButton.propTypes = propTypes;

export default ToggleButton;
