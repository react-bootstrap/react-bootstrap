import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const NavItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      href: '#'
    };
  },

  render() {
    let {
        disabled,
        active,
        href,
        title,
        target,
        children,
        ...props } = this.props;
    let classes = {
          'active': active,
          'disabled': disabled
        };
    let linkProps = {
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
      <li {...props} className={classNames(props.className, classes)}>
        <a {...linkProps}>
          { children }
        </a>
      </li>
    );
  },

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

export default NavItem;
