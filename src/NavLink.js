import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import AbstractNavItem from './AbstractNavItem';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'nav-link'
   */
  bsPrefix: PropTypes.string,

  /**
   * The active state of the NavItem item.
   */
  active: PropTypes.bool,

  /**
   * The disabled state of the NavItem item.
   */
  disabled: PropTypes.bool,

  /**
   * The ARIA role for the `NavLink`, In the context of a 'tablist' parent Nav,
   * the role defaults to 'tab'
   * */
  role: PropTypes.string,

  /** The HTML href attribute for the `NavLink` */
  href: PropTypes.string,

  /** A callback fired when the `NavLink` is selected.
   *
   * ```js
   * function (eventKey: any, event: SyntheticEvent) {}
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * Uniquely idenifies the `NavItem` amoungst its siblings,
   * used to determine and control the active state ofthe parent `Nav`
   */
  eventKey: PropTypes.any,

  /** @default 'a' */
  as: elementType,

  /** @private */
  onClick: PropTypes.func,
};

const defaultProps = {
  disabled: false,
  as: SafeAnchor,
};

function NavLink({
  bsPrefix,
  disabled,
  className,
  href,
  eventKey,
  onSelect,
  innerRef,
  as,
  ...props
}) {
  return (
    <AbstractNavItem
      {...props}
      href={href}
      ref={innerRef}
      eventKey={eventKey}
      as={as}
      disabled={disabled}
      onSelect={onSelect}
      className={classNames(className, bsPrefix, disabled && 'disabled')}
    />
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default createBootstrapComponent(NavLink, 'nav-link');
