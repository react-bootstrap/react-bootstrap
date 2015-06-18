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
    role: React.PropTypes.string,
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
    target: React.PropTypes.string,
    'aria-controls': React.PropTypes.string
  },

  getDefaultProps() {
    return {
      href: '#'
    };
  },

  render() {
    let {
        role,
        disabled,
        active,
        href,
        title,
        target,
        children,
        'aria-controls': ariaControls,  // eslint-disable-line react/prop-types
        ...props } = this.props; // eslint-disable-line object-shorthand
    let classes = {
          active,
          disabled
        };
    let linkProps = {
          role,
          href,
          title,
          target,
          onClick: this.handleClick,
          ref: 'anchor'
        };

    if (!role && href === '#') {
      linkProps.role = 'button';
    }

    return (
      <li {...props} role='presentation' className={classNames(props.className, classes)}>
        <a {...linkProps} aria-selected={active} aria-controls={ariaControls}>
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
