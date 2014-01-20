/** @jsx React.DOM */

var React          = require('react/addons');

var MenuItem = React.createClass({
  handleClick: function (e) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.key);
    }
  },

  render: function () {
    return (
      <li key={this.props.key}>
        <a onClick={this.handleClick} href="#">
          {this.props.title}
        </a>
      </li>
    );
  }
});

module.exports = MenuItem;