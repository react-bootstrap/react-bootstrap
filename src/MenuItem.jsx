/** @jsx React.DOM */

import React          from './react-es6';

var MenuItem = React.createClass({
  propTypes: {
    header: React.PropTypes.bool,
    divider: React.PropTypes.bool
  },

  handleClick: function () {
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

    if (this.props.header) {
      children = this.props.children;
      className = 'dropdown-header';
    } else if (this.props.divider) {
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