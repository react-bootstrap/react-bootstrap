/** @jsx React.DOM */

var React    = require('react');
var classSet = require('react/lib/cx');

var Tab = React.createClass({
  handleClick: function () {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.id);
    }
  },

  render: function () {
    var classes = {
      'nav': true,
      'nav-tab': true,
      'active': this.props.isActive
    };

    return this.transferPropsTo(
      <li className={classSet(classes)}>
        <a
          ref="button"
          href={this.props.id ? '#' + this.props.id : null}
          onClick={this.handleClick}>
          {this.props.children}
        </a>
      </li>
    );
  }
});

module.exports = Tab;