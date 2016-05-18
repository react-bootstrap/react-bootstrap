import classNames from 'classnames';
import React, { PropTypes } from 'react';

import { prefix } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

const NavbarToggle = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: PropTypes.node
  },

  contextTypes: {
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_onToggle: PropTypes.func,
    $bs_navbar_expanded: PropTypes.bool,
  },

  render() {
    const { onClick, className, children, ...props } = this.props;
    const {
      $bs_navbar_bsClass: bsClass = 'navbar',
      $bs_navbar_onToggle: onToggle,
      $bs_navbar_expanded: expanded,
    } = this.context;

    const buttonProps = {
      type: 'button',
      ...props,
      onClick: createChainedFunction(onClick, onToggle),
      className: classNames(
        className,
        prefix({ bsClass }, 'toggle'),
        !expanded && 'collapsed'
      )
    };

    if (children) {
      return (
        <button {...buttonProps}>
          {children}
        </button>
      );
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
});

export default NavbarToggle;
