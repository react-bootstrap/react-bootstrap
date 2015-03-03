var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var Button = require('./Button');

var Input = React.createClass({

  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.node,
    help: React.PropTypes.node,
    addonBefore: React.PropTypes.node,
    addonAfter: React.PropTypes.node,
    buttonBefore: React.PropTypes.node,
    buttonAfter: React.PropTypes.node,
    bsSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
    bsStyle: function(props) {
      if (props.type === 'submit') {
        // Return early if `type=submit` as the `Button` component
        // it transfers these props to has its own propType checks.
        return;
      }

      return React.PropTypes.oneOf(['success', 'warning', 'error']).apply(null, arguments);
    },
    hasFeedback: React.PropTypes.bool,
    groupClassName: React.PropTypes.string,
    wrapperClassName: React.PropTypes.string,
    labelClassName: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },

  getInputDOMNode: function () {
    return this.refs.input.getDOMNode();
  },

  getValue: function () {
    if (this.props.type === 'static') {
      return this.props.value;
    }
    else if (this.props.type) {
      if (this.props.type == "select" && this.props.multiple) {
        return this.getSelectedOptions();
      } else {
        return this.getInputDOMNode().value;
      }
    }
    else {
      throw Error('Cannot use getValue without specifying input type.');
    }
  },

  getChecked: function () {
    return this.getInputDOMNode().checked;
  },

  getSelectedOptions: function () {
    var values = [];

    Array.prototype.forEach.call(
      this.getInputDOMNode().getElementsByTagName('option'),
      function (option) {
        if (option.selected) {
          var value = option.getAttribute('value') || option.innerHTML;

          values.push(value);
        }
      }
    );

    return values;
  },

  isCheckboxOrRadio: function () {
    return this.props.type === 'radio' || this.props.type === 'checkbox';
  },

  isFile: function () {
    return this.props.type === 'file';
  },

  renderInput: function () {
    var input = null;

    if (!this.props.type) {
      return this.props.children
    }

    switch (this.props.type) {
      case 'select':
        input = (
          <select {...this.props} className={joinClasses(this.props.className, 'form-control')} ref="input" key="input">
            {this.props.children}
          </select>
        );
        break;
      case 'textarea':
        input = <textarea {...this.props} className={joinClasses(this.props.className, 'form-control')} ref="input" key="input" />;
        break;
      case 'static':
        input = (
          <p {...this.props} className={joinClasses(this.props.className, 'form-control-static')} ref="input"  key="input">
            {this.props.value}
          </p>
        );
        break;
      case 'submit':
        input = (
          <Button {...this.props} componentClass='input' ref='input' key='input' />
        );
        break;
      default:
        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
        input = <input {...this.props} className={joinClasses(this.props.className, className)} ref="input" key="input" />;
    }

    return input;
  },

  renderInputGroup: function (children) {
    var addonBefore = this.props.addonBefore ? (
      <span className="input-group-addon" key="addonBefore">
        {this.props.addonBefore}
      </span>
    ) : null;

    var addonAfter = this.props.addonAfter ? (
      <span className="input-group-addon" key="addonAfter">
        {this.props.addonAfter}
      </span>
    ) : null;

    var buttonBefore = this.props.buttonBefore ? (
      <span className="input-group-btn">
        {this.props.buttonBefore}
      </span>
    ) : null;

    var buttonAfter = this.props.buttonAfter ? (
      <span className="input-group-btn">
        {this.props.buttonAfter}
      </span>
    ) : null;

    var inputGroupClassName;
    switch (this.props.bsSize) {
      case 'small': inputGroupClassName = 'input-group-sm'; break;
      case 'large': inputGroupClassName = 'input-group-lg'; break;
    }

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? (
      <div className={joinClasses(inputGroupClassName, 'input-group')} key="input-group">
        {addonBefore}
        {buttonBefore}
        {children}
        {addonAfter}
        {buttonAfter}
      </div>
    ) : children;
  },

  renderIcon: function () {
    var classes = {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': this.props.bsStyle === 'success',
      'glyphicon-warning-sign': this.props.bsStyle === 'warning',
      'glyphicon-remove': this.props.bsStyle === 'error'
    };

    return this.props.hasFeedback ? (
      <span className={classSet(classes)} key="icon" />
    ) : null;
  },

  renderHelp: function () {
    return this.props.help ? (
      <span className="help-block" key="help">
        {this.props.help}
      </span>
    ) : null;
  },

  renderCheckboxandRadioWrapper: function (children) {
    var classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return (
      <div className={classSet(classes)} key="checkboxRadioWrapper">
        {children}
      </div>
    );
  },

  renderWrapper: function (children) {
    return this.props.wrapperClassName ? (
      <div className={this.props.wrapperClassName} key="wrapper">
        {children}
      </div>
    ) : children;
  },

  renderLabel: function (children) {
    var classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? (
      <label htmlFor={this.props.id} className={classSet(classes)} key="label">
        {children}
        {this.props.label}
      </label>
    ) : children;
  },

  renderFormGroup: function (children) {
    var classes = {
      'form-group': true,
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error'
    };
    classes[this.props.groupClassName] = this.props.groupClassName;

    return (
      <div className={classSet(classes)}>
        {children}
      </div>
    );
  },

  render: function () {
    if (this.isCheckboxOrRadio()) {
      return this.renderFormGroup(
        this.renderWrapper([
          this.renderCheckboxandRadioWrapper(
            this.renderLabel(
              this.renderInput()
            )
          ),
          this.renderHelp()
        ])
      );
    }
    else {
      return this.renderFormGroup([
        this.renderLabel(),
        this.renderWrapper([
          this.renderInputGroup(
            this.renderInput()
          ),
          this.renderIcon(),
          this.renderHelp()
        ])
      ]);
    }
  }
});

module.exports = Input;
