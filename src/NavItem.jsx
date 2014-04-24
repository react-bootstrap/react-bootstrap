/** @jsx React.DOM */

import React              from './react-es6';
import classSet           from './react-es6/lib/cx';
import BootstrapMixin     from './BootstrapMixin';
import DropdownStateMixin from './DropdownStateMixin';

var NavItem = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    dropdown: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      href: '#'
    };
  },

  render: function () {
    var classes = {
      'active': this.props.active,
      'disabled': this.props.disabled,
      'dropdown': this.props.dropdown,
      'open': this.state.open
    };

    var anchorClass = this.props.dropdown ? 'dropdown-toggle' : '';
    var datatoggle = this.props.dropdown ? 'dropdown' : '';

    return this.transferPropsTo(
      <li className={classSet(classes)}>
        <a
          className={anchorClass}
          href={this.props.href}
          title={this.props.title}
          onClick={this.handleClick}
          ref="anchor"
          data-toggle={datatoggle}>
          {this.props.dropdown ? <span>{this.props.children[0]}<span className="caret"></span></span> : this.props.children}
        </a>
        {this.props.dropdown ? this.props.children.slice(1) : null}
      </li>
    );
  },

  handleOpenClick: function () {
    this.setDropdownState(true);
  },

  handleClick: function (e) {
    if (this.props.dropdown) {
      e.preventDefault();
      this.handleOpenClick();
    } else if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.key,this.props.href);
      }
    }
  }
});

export default = NavItem;