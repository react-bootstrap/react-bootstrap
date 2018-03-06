import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
  state = { focused: false };

  handleFocus = e => {
    if (e.target.tagName === 'INPUT') this.setState({ focused: true });
  };
  handleBlur = e => {
    if (e.target.tagName === 'INPUT') this.setState({ focused: false });
  };
  render() {
    const {
      children,
      name,
      className,
      checked,
      type,
      onChange,
      value,
      ...props
    } = this.props;
    const { focused } = this.state;
    const disabled = props.disabled;

    return (
      <Button
        {...props}
        className={classNames(className, focused && 'focus')}
        type={null}
        active={!!checked}
        componentClass="label"
      >
        <input
          name={name}
          type={type}
          value={value}
          autoComplete="off"
          checked={!!checked}
          disabled={!!disabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={onChange}
        />

        {children}
      </Button>
    );
  }
}

ToggleButton.propTypes = propTypes;

export default ToggleButton;
