/** @jsx React.DOM */

var React    = require('react');

var MenuItem = React.createClass({
  handleClick: function (e) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.key);
    }
  },

  renderAnchor: function () {
    return (
      <a onClick={this.handleClick} href="#" tabIndex="-1" ref="anchor">
        {this.props.children}
      </a>
    );
  },

  render: function () {
    var className = null;
    var children = null;

    if (this.props.bsVariation === 'header') {
      children = this.props.children;
      className = 'dropdown-header';
    } else if (this.props.bsVariation === 'divider') {
      className = 'divider';
    } else {
      children = this.renderAnchor();
    }

    return this.transferPropsTo(
      <li role="presentation" className={className}>
        {children}
      </li>
    );
  }
});

export default = MenuItem;