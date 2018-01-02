import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { prefix } from './utils/bootstrapUtils';

const propTypes = {
  onClick: PropTypes.func,
  /**
   * The toggle content, if left empty it will render the default toggle (seen above).
   */
  children: PropTypes.node
};

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
  })
};

class NavbarToggle extends React.Component {
  handleClick = (...args) => {
    const { onClick } = this.props;
    const navbarProps = this.context.$bs_navbar;
    if (onClick) onClick(...args);
    if (navbarProps && navbarProps.onToggle) navbarProps.onToggle(...args);
  }
  render() {
    const { onClick, className, children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const buttonProps = {
      type: 'button',
      ...props,
      onClick: this.handleClick,
      className: classNames(
        className,
        prefix(navbarProps, 'toggle'),
        !navbarProps.expanded && 'collapsed'
      )
    };

    if (children) {
      return <button {...buttonProps}>{children}</button>;
    }

    return (
      <button {...buttonProps}>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    );
  }
}

NavbarToggle.propTypes = propTypes;
NavbarToggle.contextTypes = contextTypes;

export default NavbarToggle;
