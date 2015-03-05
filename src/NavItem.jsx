var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');

var NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var {
        disabled,
        active,
        href,
        title,
        target,
        children,
        ...props } = this.props,
        classes = {
          'active': active,
          'disabled': disabled
        },
        linkProps = {
          href,
          title,
          target,
          onClick: this.handleClick,
          ref: 'anchor'
        };

    if (href === '#') {
      linkProps.role = 'button';
    }

    return (
      <li {...props} className={joinClasses(props.className, classSet(classes))}>
        <a {...linkProps}>
          { children }
        </a>
      </li>
    );
  },

  handleClick: function (e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

module.exports = NavItem;
