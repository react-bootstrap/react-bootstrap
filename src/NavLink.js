import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import mapContextToProps from 'react-context-toolbox/lib/mapContextToProps';

import SafeAnchor from './SafeAnchor';
import NavContext from './NavContext';
import AbstractNavItem from './AbstractNavItem';
import SelectableContext, { makeEventKey } from './SelectableContext';
import chain from './utils/createChainedFunction';
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

  /** @private */
  onClick: PropTypes.func,
};

const defaultProps = {
  disabled: false,
};

class NavLink extends React.Component {
  handleClick = e => {
    const { onClick, onSelect, eventKey } = this.props;
    if (onClick) onClick(e);
    if (eventKey != null && onSelect) onSelect(eventKey, e);
  };

  render() {
    const {
      active,
      bsPrefix,
      disabled,
      className,
      href,
      eventKey,
      onSelect: _1,
      ...props
    } = this.props;

    return (
      <AbstractNavItem
        {...props}
        href={href}
        eventKey={eventKey}
        as={SafeAnchor}
        disabled={disabled}
        onClick={this.handleClick}
        className={classNames(className, bsPrefix, disabled && 'disabled')}
      />
    );
  }
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default mapContextToProps(
  [SelectableContext, NavContext],
  (
    onSelect,
    navContext,
    { active, eventKey, href, role, tabIndex, onSelect: pSelect },
  ) => {
    let navItemKey = makeEventKey(eventKey, href);

    const props = {
      role,
      active,
      eventKey: navItemKey,
      onSelect: chain(pSelect, onSelect),
    };

    return props;
  },
  createBootstrapComponent(NavLink, 'nav-link'),
);
