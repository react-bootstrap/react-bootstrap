import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import NavContext from './NavContext';
import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * The active state of the NavItem item.
   */
  active: PropTypes.bool,

  /**
   * The disabled state of the NavItem item.
   */
  disabled: PropTypes.bool,

  /** The ARIA role for the `NavLink` */
  role: PropTypes.string,

  /** The HTML href attribute for the `NavLink` */
  href: PropTypes.string,

  /**
   * Uniquely idenifies the `NavItem` amoungst its siblings,
   * used to determine and control the active state ofthe parent `Nav`
   */
  eventKey: PropTypes.any,

  /** @private */
  onClick: PropTypes.func
};

const defaultProps = {
  disabled: false
};

class NavLink extends React.Component {
  handleClick = e => {
    const { onClick, eventKey, href } = this.props;
    if (onClick) onClick(e);
    if (this.navContext) this.navContext.onSelect(String(eventKey || href));
  };

  render() {
    return (
      <NavContext.Consumer>
        {navContext => {
          const {
            active,
            disabled,
            onClick,
            className,
            style,
            eventKey,
            href,
            role: propsRole,
            ...props
          } = this.props;

          delete props.onSelect;

          const [bsProps, elementProps] = splitBsProps(props);
          const navItemKey = String(eventKey || href);

          const isActive =
            active == null
              ? String(navContext.activeKey) === navItemKey
              : active;

          let role = propsRole;
          if (navContext.role === 'tablist') {
            role = 'tab';
            elementProps['data-rb-event-key'] = navItemKey;
            elementProps['aria-selected'] = isActive;
            elementProps.tabIndex = isActive ? elementProps.tabIndex : -1;
          }

          this.navContext = navContext;

          return (
            <SafeAnchor
              id={navContext.getControllerId(navItemKey)}
              aria-controls={navContext.getControlledId(navItemKey)}
              {...elementProps}
              role={role}
              href={href}
              disabled={disabled}
              onClick={this.handleClick}
              className={classNames(
                className,
                prefix(bsProps),
                isActive && 'active',
                disabled && 'disabled'
              )}
            />
          );
        }}
      </NavContext.Consumer>
    );
  }
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default bsClass('nav-link', NavLink);
