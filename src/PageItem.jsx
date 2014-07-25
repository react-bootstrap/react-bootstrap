/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');

var PageItem = React.createClass({

  propTypes: {
    disabled: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    next: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var classes = {
      'disabled': this.props.disabled,
      'previous': this.props.previous,
      'next': this.props.next
    };

    return this.transferPropsTo(
      <li
        className={classSet(classes)}>
        <a
          href={this.props.href}
          title={this.props.title}
          onClick={this.handleSelect}
          ref="anchor">
          {this.props.children}
        </a>
      </li>
    );
  },

  handleSelect: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.key, this.props.href);
      }
    }
  }
});

module.exports = PageItem;