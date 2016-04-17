import classNames from 'classnames';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const NavItem = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    role: React.PropTypes.string,
    href: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    eventKey: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  render() {
    let {
      active, disabled, role, href, onClick, className, style, ...props,
    } = this.props;

    delete props.onSelect;
    delete props.eventKey;

    if (!role) {
      if (href === '#') {
        role = 'button';
      }
    } else if (role === 'tab') {
      props['aria-selected'] = active;
    }

    return (
      <li
        role="presentation"
        className={classNames(className, { active, disabled })}
        style={style}
      >
        <SafeAnchor
          {...props}
          disabled={disabled}
          role={role}
          href={href}
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  },

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }
});

export default NavItem;
