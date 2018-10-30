import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';

const propTypes = {
  active: PropTypes.bool,
  role: PropTypes.string,

  href: PropTypes.string,
  tabIndex: PropTypes.string,
  eventKey: PropTypes.any,

  as: PropTypes.any,
};

const defaultProps = {
  disabled: false,
};

class AbstractNavItem extends React.Component {
  render() {
    const {
      active,
      className,
      tabIndex,
      eventKey,
      onSelect,
      as: Component,
      ...props
    } = this.props;

    const navKey = makeEventKey(eventKey, props.href);

    return (
      <SelectableContext.Consumer>
        {parentOnSelect => (
          <NavContext.Consumer>
            {navContext => {
              let isActive = active;
              if (navContext) {
                if (!props.role && navContext.role === 'tablist')
                  props.role = 'tab';

                props['data-rb-event-key'] = navKey;
                props.id = navContext.getControllerId(navKey);
                props['aria-controls'] = navContext.getControlledId(navKey);

                isActive =
                  active == null && navKey != null
                    ? navContext.activeKey === navKey
                    : active;
              }

              if (props.role === 'tab') {
                props.tabIndex = isActive ? tabIndex : -1;
                props['aria-selected'] = isActive;
              }

              return (
                <Component
                  {...props}
                  className={classNames(className, isActive && 'active')}
                  onClick={e => {
                    const { onClick } = this.props;

                    if (onClick) onClick(e);
                    if (navKey == null) return;
                    if (onSelect) onSelect(navKey, e);
                    if (parentOnSelect) parentOnSelect(navKey, e);
                  }}
                />
              );
            }}
          </NavContext.Consumer>
        )}
      </SelectableContext.Consumer>
    );
  }
}

AbstractNavItem.propTypes = propTypes;
AbstractNavItem.defaultProps = defaultProps;

export default AbstractNavItem;
