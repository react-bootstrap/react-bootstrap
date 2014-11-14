var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    eventKey: React.PropTypes.any
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
      <li {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
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
        this.props.onSelect(this.props.eventKey, this.props.href);
      }
    }
  }
});

module.exports = NavItem;