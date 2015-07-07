import React from 'react';
import classNames from 'classnames';
import { all, singlePropFrom } from '../utils/CustomPropTypes';

const singleNodeFromChildAndLabel = all([
  singlePropFrom(['children', 'label']),
  React.PropTypes.node
]);

const propTypes = {
  /**
   * Wraps the radio button in a label along with the provided content. Do not use with the label prop
   */
  children: singleNodeFromChildAndLabel,
  /**
   * Disables the radio button
   */
  disabled: React.PropTypes.bool,
  /**
   * Applies the .radio-inline class to the wrapping label
   */
  inline: React.PropTypes.bool,
  /**
   * Wraps the radio button in a label along with the provided content. Do not use with children
   */
  label: singleNodeFromChildAndLabel,
  /**
   * Apply a css class directly to the wrapping label tag (if label is provided)
   */
  labelClassName: React.PropTypes.string,
  /**
   * Applies a name to associate the radio button with a group.
   */
  name: React.PropTypes.string,
  /**
   * Calls this when the checked state changes
   */
  onChange: React.PropTypes.func,
  /**
   * Applies a value to this radio button
   */
  value: React.PropTypes.any
};

export default class RadioButton extends React.Component {
  getInputDOMNode() {
    return React.findDOMNode(this.refs.input);
  }

  getValue() {
    return this.props.value;
  }

  getChecked() {
    return this.getInputDOMNode().checked;
  }

  renderWrapper(label, inline) {
    return inline ? label : <div className="radio">{label}</div>;
  }

  renderLabel(input) {
    if (!this.props.label && !this.props.children) {
      return input;
    }

    const {children, id, label, inline, ...other} = this.props;
    const innerContent = children ? children : label;

    const classes = {
      'radio-inline': inline
    };

    const wrapped = (
      <label className={classNames(classes, this.props.labelClassName)} htmlFor={id}>
        {input}
        {innerContent}
      </label>
    );

    return this.renderWrapper(wrapped, inline);
  }

  render() {
    const {children, inline, label, ...other} = this.props;
    return this.renderLabel(
      <input type="radio" {...other} ref="input" />
    );
  }
}

RadioButton.propTypes = propTypes;
