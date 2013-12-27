/** @jsx React.DOM */

var React          = require('react');
var merge          = require('react/lib/merge');

module.exports     = React.createClass({
  renderAnchor: function (className) {
    return (
      <a
        href={this.props.href}
        className={className}
        onClick={this.props.onClick}
        disabled={this.props.disabled}>
        {this.props.children}
      </a>
    );
  },

  renderButton: function (className) {
    return (
      <button
        type="button"
        className={className}
        onClick={this.props.onClick}
        disabled={this.props.disabled}>
        {this.props.children}
      </button>
    );
  },

  render: function () {
    var className = React.addons.classSet(merge({
          "btn": true,
          "btn-default": this.props.default,
          "btn-primary": this.props.primary,
          "btn-success": this.props.success,
          "btn-info": this.props.info,
          "btn-warning": this.props.warning,
          "btn-danger": this.props.danger
        }, this.props.className));

    return (this.props.href) ?
      this.renderAnchor(className) : this.renderButton(className);
  }
});