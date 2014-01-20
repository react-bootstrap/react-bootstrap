/** @jsx React.DOM */

var React = require('react/addons');

var Tab = React.createClass({
  handleClick: function () {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.id);
    }
  },

  render: function () {
    var className = React.addons.classSet({
      'nav': true,
      'nav-tab': true,
      'active': this.props.isActive
    });

    return this.transferPropsTo(
      <li className={className}>
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