import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import tbsUtils from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

class NavbarToggle extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: PropTypes.node
  };

  static contextTypes = {
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_onToggle: PropTypes.func,
  };

  render() {
    const { onClick, className, children, ...props } = this.props;
    const {
      $bs_navbar_bsClass: bsClass = 'navbar',
      $bs_navbar_onToggle: onToggle
    } = this.context;

    const buttonProps = {
      type: 'button',
      ...props,
      onClick: createChainedFunction(onClick, onToggle),
      className: classNames(className, tbsUtils.prefix({ bsClass }, 'toggle'))
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
}

export default NavbarToggle;
