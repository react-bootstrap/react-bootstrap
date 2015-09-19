import React from 'react';
import classNames from 'classnames';
import FormGroup from './FormGroup';
import Glyphicon from './Glyphicon';

class InputBase extends React.Component {
  getInputDOMNode() {
    return React.findDOMNode(this.refs.input);
  }

  getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      if (this.props.type === 'select' && this.props.multiple) {
        return this.getSelectedOptions();
      }
      return this.getInputDOMNode().value;
    }
    throw new Error('Cannot use getValue without specifying input type.');
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
    default:
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
    if (this.props.hasFeedback) {
      if (this.props.feedbackIcon) {
        return React.cloneElement(this.props.feedbackIcon, { formControlFeedback: true });
      }

      switch (this.props.bsStyle) {
      case 'success': return <Glyphicon formControlFeedback glyph="ok" key="icon" />;
      case 'warning': return <Glyphicon formControlFeedback glyph="warning-sign" key="icon" />;
      case 'error': return <Glyphicon formControlFeedback glyph="remove" key="icon" />;
      default: return <span className="form-control-feedback" key="icon" />;
      }
    } else {
      return null;
    }
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
    default:
      const className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
      return <input {...this.props} className={classNames(this.props.className, className)} ref="input" key="input" />;
    }
  }

  renderFormGroup(children) {
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

InputBase.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.node,
  help: React.PropTypes.node,
  addonBefore: React.PropTypes.node,
  addonAfter: React.PropTypes.node,
  buttonBefore: React.PropTypes.node,
  buttonAfter: React.PropTypes.node,
  bsSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
  bsStyle: React.PropTypes.oneOf(['success', 'warning', 'error']),
  hasFeedback: React.PropTypes.bool,
  feedbackIcon: React.PropTypes.node,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  groupClassName: React.PropTypes.string,
  wrapperClassName: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  value: React.PropTypes.any
};

InputBase.defaultProps = {
  disabled: false,
  hasFeedback: false,
  multiple: false
};

export default InputBase;
