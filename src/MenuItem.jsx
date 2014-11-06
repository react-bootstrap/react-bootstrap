var React = require('react');
var joinClasses = require('react/lib/joinClasses');
var classSet = require('react/lib/cx');

var MenuItem = React.createClass({
  propTypes: {
    header:    React.PropTypes.bool,
    divider:   React.PropTypes.bool,
    href:      React.PropTypes.string,
    title:     React.PropTypes.string,
    onSelect:  React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(this._currentElement.key);
    }
  },

  renderAnchor: function () {
    return (
      <a onClick={this.handleClick} href={this.props.href} title={this.props.title} tabIndex="-1">
        {this.props.children}
      </a>
    );
  },

  render: function () {
    var classes = {
        'dropdown-header': this.props.header,
        'divider': this.props.divider
      };

    var children = null;
    if (this.props.header) {
      children = this.props.children;
    } else if (!this.props.divider) {
      children = this.renderAnchor();
    }

    return (
      <li {...this.props} role="presentation" title={null} href={null}
        className={joinClasses(this.props.className, classSet(classes))}>
        {children}
      </li>
    );
  }
});

module.exports = MenuItem;