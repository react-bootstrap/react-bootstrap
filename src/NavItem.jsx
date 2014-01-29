/** @jsx React.DOM */

var React             = require('react');
var classSet          = require('react/lib/cx');
import BootstrapMixin from './BootstrapMixin';

var NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    isActive: React.PropTypes.bool,
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
      'active': this.props.isActive,
      'disabled': this.props.disabled
    };

    return this.transferPropsTo(
      <li className={classSet(classes)}>
        <a
          href={this.props.href}
          title={this.props.title}
          onClick={this.handleClick}>
          {this.props.children}
        </a>
      </li>
    );
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.key);
      }
    }
  }
});

export default = NavItem;