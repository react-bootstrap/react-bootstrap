import React from 'react';
import classNames from 'classnames';
import ValidComponentChildren from '../utils/ValidComponentChildren';

function noop() { }

export default class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.defaultValue};
    this.handleChange = this.handleChange.bind(this);
  }

  getValue() {
    return this.state.value;
  }

  renderLegend() {
    const {legend, srOnly} = this.props;
    const classes = {
      'sr-only': srOnly
    };

    return legend ?
      <legend className={classNames(classes)}>{legend}</legend> :
      null;
  }

  handleChange(evt) {
    if (!evt.target) {
      return;
    }

    const {value} = evt.target;
    this.setState({value});
    this.props.onChange(value);
  }

  renderChildren() {
    const {name, inline} = this.props;
    return ValidComponentChildren.map(this.props.children, child => {
      const {value} = child.props;
      const checked = this.state.value ? this.state.value === value : false;
      return React.cloneElement(child, {name, inline, checked, onChange: this.handleChange});
    });
  }

  render() {
    return (
      <fieldset ref="radioGroup" className={classNames('form-group', this.props.className)}>
        {this.renderLegend()}
        {this.renderChildren()}
      </fieldset>
    );
  }
}

RadioGroup.propTypes = {
  /**
   * The default value of the radio group. The RadioButton in this group with the provided value will be checked by default.
   */
  defaultValue: React.PropTypes.any,
  /**
   * Formats the radio group with the class .radio-inline
   */
  inline: React.PropTypes.bool,
  /**
   * Populates a legend element at the top of the fieldset
   */
  legend: React.PropTypes.node,
  /**
   * Applies the provided name prop to all the given children.
   */
  name: React.PropTypes.string.isRequired,
  /**
   * This is called when the selected value changes, with the new value as a parameter
   */
  onChange: React.PropTypes.func,
  /**
   * Applies the legend, if present, with the .sr-only class
   */
  srOnly: React.PropTypes.bool
};

RadioGroup.defaultProps = {
  onChange: noop
};
