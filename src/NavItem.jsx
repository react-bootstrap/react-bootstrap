var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var classSet = require('react/lib/cx');
var BootstrapMixin = require('./BootstrapMixin');

var NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string
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
        this.props.onSelect(this._currentElement.key, this.props.href);
      }
    }
  }
});

module.exports = NavItem;