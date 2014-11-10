/** @jsx React.DOM */

var React = require('react/addons');
var BootstrapMixin = require('./BootstrapMixin');

var NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    navKey:   React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var classes = {
      'active': this.props.active,
      'disabled': this.props.disabled
    };

    return (
      <li {...this.props} className={React.addons.classSet(classes)}>
        <a
          href={this.props.href}
          title={this.props.title}
          onClick={this.handleClick}
          ref="anchor">
          {this.props.children}
        </a>
      </li>
    );
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.navKey,this.props.href);
      }
    }
  }
});

module.exports = NavItem;
