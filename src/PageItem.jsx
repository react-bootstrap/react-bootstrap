var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');

var PageItem = React.createClass({

  propTypes: {
    disabled: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    next: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    eventKey: React.PropTypes.any
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

    return (
      <li
        {...this.props}
        className={joinClasses(this.props.className, classSet(classes))}>
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
        this.props.onSelect(this.props.eventKey, this.props.href);
      }
    }
  }
});

module.exports = PageItem;