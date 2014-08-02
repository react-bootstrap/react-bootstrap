/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');

var Input = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.renderable,
    help: React.PropTypes.renderable,
    addonBefore: React.PropTypes.renderable,
    wrapAddonBefore: React.PropTypes.bool,
    addonAfter: React.PropTypes.renderable,
    wrapAddonAfter: React.PropTypes.bool,
    bsStyle: React.PropTypes.oneOf(['success', 'warning', 'error']),
    hasFeedback: React.PropTypes.bool,
    groupClassName: React.PropTypes.string,
    wrapperClassName: React.PropTypes.string,
    labelClassName: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      wrapAddonAfter: true,
      wrapAddonBefore: true,
    };
  },

  getInputDOMNode: function () {
    return this.refs.input.getDOMNode();
  },

  getValue: function () {
    if (this.props.type === 'static') {
      return this.props.value;
    }
    else if (this.props.type) {
      return this.getInputDOMNode().value;
    }
    else {
      throw Error('Cannot use getValue without specifying input type.');
    }
  },

  getChecked: function () {
    return this.getInputDOMNode().checked;
  },

  isCheckboxOrRadio: function () {
    return this.props.type === 'radio' || this.props.type === 'checkbox';
  },

  renderInput: function () {
    var input = null;

    if (!this.props.type) {
      return this.props.children
    }

    switch (this.props.type) {
      case 'select':
        input = (
          <select className="form-control" ref="input" key="input">
            {this.props.children}
          </select>
        );
        break;
      case 'textarea':
        input = <textarea className="form-control" ref="input" key="input" />;
        break;
      case 'static':
        input = (
          <p className="form-control-static" ref="input"  key="input">
            {this.props.value}
          </p>
        );
        break;
      default:
        var className = this.isCheckboxOrRadio() ? '' : 'form-control';
        input = <input className={className} ref="input" key="input" />;
    }

    return this.transferPropsTo(input);
  },

  renderInputGroup: function (children) {
    var addonBefore = this.props.addonBefore ?
      this.props.wrapAddonBefore ? (
        <span className="input-group-addon" key="addonBefore">
          {this.props.addonBefore}
        </span>
      ) : this.props.addonBefore
    : null;

    var addonAfter = this.props.addonAfter ?
      this.props.wrapAddonAfter ? (
        <span className="input-group-addon" key="addonAfter">
          {this.props.addonAfter}
        </span>
      ) : this.props.addonAfter
    : null;

    return addonBefore || addonAfter ? (
      <div className="input-group" key="input-group">
        {addonBefore}
        {children}
        {addonAfter}
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
