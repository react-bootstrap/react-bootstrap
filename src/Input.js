import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import FormGroup from './FormGroup';

class Input extends React.Component {
  getInputDOMNode() {
    return React.findDOMNode(this.refs.input);
  }

  getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      if (this.props.type === 'select' && this.props.multiple) {
        return this.getSelectedOptions();
      } else {
        return this.getInputDOMNode().value;
      }
    } else {
      throw 'Cannot use getValue without specifying input type.';
    }
  }

  getChecked() {
    return this.getInputDOMNode().checked;
  }

  getSelectedOptions() {
    let values = [];

    Array.prototype.forEach.call(
      this.getInputDOMNode().getElementsByTagName('option'),
      (option) => {
        if (option.selected) {
          let value = option.getAttribute('value') || option.innerHtml;
          values.push(value);
        }
      });

    return values;
  }

  isCheckboxOrRadio() {
    return this.props.type === 'checkbox' || this.props.type === 'radio';
  }

  isFile() {
    return this.props.type === 'file';
  }

  renderInputGroup(children) {
    let addonBefore = this.props.addonBefore ? (
      <span className="input-group-addon" key="addonBefore">
        {this.props.addonBefore}
      </span>
    ) : null;

    let addonAfter = this.props.addonAfter ? (
      <span className="input-group-addon" key="addonAfter">
        {this.props.addonAfter}
      </span>
    ) : null;

    let buttonBefore = this.props.buttonBefore ? (
      <span className="input-group-btn">
        {this.props.buttonBefore}
      </span>
    ) : null;

    let buttonAfter = this.props.buttonAfter ? (
      <span className="input-group-btn">
        {this.props.buttonAfter}
      </span>
    ) : null;

    let inputGroupClassName;
    switch (this.props.bsSize) {
      case 'small': inputGroupClassName = 'input-group-sm'; break;
      case 'large': inputGroupClassName = 'input-group-lg'; break;
    }

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? (
      <div className={classNames(inputGroupClassName, 'input-group')} key="input-group">
        {addonBefore}
        {buttonBefore}
        {children}
        {addonAfter}
        {buttonAfter}
      </div>
    ) : children;
  }

  renderIcon() {
    let classes = {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': this.props.bsStyle === 'success',
      'glyphicon-warning-sign': this.props.bsStyle === 'warning',
      'glyphicon-remove': this.props.bsStyle === 'error'
    };

    return this.props.hasFeedback ? (
      <span className={classNames(classes)} key="icon" />
    ) : null;
  }

  renderHelp() {
    return this.props.help ? (
      <span className="help-block" key="help">
        {this.props.help}
      </span>
    ) : null;
  }

  renderCheckboxAndRadioWrapper(children) {
    let classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return (
      <div className={classNames(classes)} key="checkboxRadioWrapper">
        {children}
      </div>
    );
  }

  renderWrapper(children) {
    return this.props.wrapperClassName ? (
      <div className={this.props.wrapperClassName} key="wrapper">
        {children}
      </div>
    ) : children;
  }

  renderLabel(children) {
    let classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? (
      <label htmlFor={this.props.id} className={classNames(classes)} key="label">
        {children}
        {this.props.label}
      </label>
    ) : children;
  }

  renderInput() {
    if (!this.props.type) {
      return this.props.children;
    }

    switch (this.props.type) {
      case 'select':
        return (
          <select {...this.props} className={classNames(this.props.className, 'form-control')} ref="input" key="input">
            {this.props.children}
          </select>
        );
      case 'textarea':
        return <textarea {...this.props} className={classNames(this.props.className, 'form-control')} ref="input" key="input" />;
      case 'static':
        return (
          <p {...this.props} className={classNames(this.props.className, 'form-control-static')} ref="input" key="input">
            {this.props.value}
          </p>
        );
      case 'submit':
        return <Button {...this.props} componentClass="input" ref="input" key="input" />;
    }

    let className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
    return <input {...this.props} className={classNames(this.props.className, className)} ref="input" key="input" />;
  }

  renderFormGroup(children) {
    if (this.props.type === 'submit') {
      let {bsStyle, ...other} = this.props; /* eslint no-unused-vars: 0 */
      return <FormGroup {...other}>{children}</FormGroup>;
    }

    return <FormGroup {...this.props}>{children}</FormGroup>;
  }

  renderChildren() {
    return !this.isCheckboxOrRadio() ? [
      this.renderLabel(),
      this.renderWrapper([
        this.renderInputGroup(
          this.renderInput()
        ),
        this.renderIcon(),
        this.renderHelp()
      ])
    ] : this.renderWrapper([
      this.renderCheckboxAndRadioWrapper(
        this.renderLabel(
          this.renderInput()
        )
      ),
      this.renderHelp()
    ]);
  }

  render() {
    let children = this.renderChildren();
    return this.renderFormGroup(children);
  }
}

Input.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.node,
  help: React.PropTypes.node,
  addonBefore: React.PropTypes.node,
  addonAfter: React.PropTypes.node,
  buttonBefore: React.PropTypes.node,
  buttonAfter: React.PropTypes.node,
  bsSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
  bsStyle(props) {
    if (props.type === 'submit') {
      return null;
    }
    return React.PropTypes.oneOf(['success', 'warning', 'error']).apply(null, arguments);
  },
  hasFeedback: React.PropTypes.bool,
  id: React.PropTypes.string,
  groupClassName: React.PropTypes.string,
  wrapperClassName: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  value: React.PropTypes.any
};

export default Input;
