/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var CustomPropTypes = require('./utils/CustomPropTypes');

var NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    componentClass: CustomPropTypes.componentClass
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var component = this.props.componentClass || React.DOM.a;
    var classes = {
      'active': this.props.active,
      'disabled': this.props.disabled
    };

    anchor = this.transferPropsTo(
      <component
        onClick={this.handleClick}
        ref="anchor">
        {this.props.children}
      </component>
    );

    return (
      <li className={classSet(classes)}>
        {anchor}
      </li>
    );
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.key,this.props.href);
      }
    }
  }
});

module.exports = NavItem;
