import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

const propTypes = {
  /**
   * The `<input>` `type`
   * @type {[type]}
   */
  type: PropTypes.oneOf(['checkbox', 'radio']),

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: PropTypes.string,

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>`` automatically
   */
  checked: PropTypes.bool,

  /**
   * The disabled state of both the label and input
   */
  disabled: PropTypes.bool,

  /**
   * [onChange description]
   */
  onChange: PropTypes.func,
  /**
   * The value of the input, and unique identifier in the ToggleButtonGroup
   */
  value: PropTypes.any.isRequired
};

class ToggleButton extends React.Component {
  render() {
    const {
      children,
      name,
      checked,
      type,
      onChange,
      value,
      ...props
    } = this.props;
    const disabled = props.disabled;

    return (
      <Button {...props} active={!!checked} componentClass="label">
        <input
          name={name}
          type={type}
          autoComplete="off"
          value={value}
          checked={!!checked}
          disabled={!!disabled}
          onChange={onChange}
        />

        {children}
      </Button>
    );
  }
}

ToggleButton.propTypes = propTypes;

export default ToggleButton;
