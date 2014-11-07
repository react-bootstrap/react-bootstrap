/** @jsx React.DOM */

var React = require('react/addons');
var BootstrapMixin = require('./BootstrapMixin');

var Button = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    active:   React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    block:    React.PropTypes.bool,
    navItem:    React.PropTypes.bool,
    navDropdown: React.PropTypes.bool,
    componentClass: React.PropTypes.node
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button',
      bsStyle: 'default',
      type: 'button'
    };
  },

  render: function () {
    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
    var renderFuncName;

    classes['active'] = this.props.active;
    classes['btn-block'] = this.props.block;

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.navDropdown ?
      'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor: function (classes) {
    var Component = this.props.componentClass || 'a';
    var href = this.props.href || '#';
    classes['disabled'] = this.props.disabled;

    return this.transferPropsTo(
      <Component
        href={href}
        className={React.addons.classSet(classes)}
        role="button">
        {this.props.children}
      </Component>
    );
  },

  renderButton: function (classes) {
    var Component = this.props.componentClass || 'button';

    return this.transferPropsTo(
      <Component
        className={React.addons.classSet(classes)}>
        {this.props.children}
      </Component>
    );
  },

  renderNavItem: function (classes) {
    var liClasses = {
      active: this.props.active
    };

    return (
      <li className={React.addons.classSet(liClasses)}>
        {this.renderAnchor(classes)}
      </li>
    );
  }
});

module.exports = Button;
