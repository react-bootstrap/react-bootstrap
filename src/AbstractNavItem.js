import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';

const propTypes = {
  active: PropTypes.bool,
  role: PropTypes.string,

  href: PropTypes.string,
  tabIndex: PropTypes.string,
  eventKey: PropTypes.any,
  onclick: PropTypes.func,

  as: PropTypes.any,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  id: PropTypes.string,
};

const defaultProps = {
  disabled: false,
};

const AbstractNavItem = React.forwardRef(
  (
    {
      active,
      className,
      tabIndex,
      eventKey,
      onSelect,
      onClick,
      as: Component,
      id: _id,
      ...props
    },
    ref,
  ) => {
    const navKey = makeEventKey(eventKey, props.href);
    const parentOnSelect = useContext(SelectableContext);
    const navContext = useContext(NavContext);
    let id = _id;

    let isActive = active;
    if (navContext) {
      if (!props.role && navContext.role === 'tablist') props.role = 'tab';

      const controllerId = navContext.getControllerId(navKey);
      if (controllerId) {
        id = controllerId;
      }

      props['data-rb-event-key'] = navKey;
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

    const handleOnclick = useEventCallback(e => {
      if (onClick) onClick(e);
      if (navKey == null) return;
      if (onSelect) onSelect(navKey, e);
      if (parentOnSelect) parentOnSelect(navKey, e);
    });

    return (
      <Component
        {...props}
        ref={ref}
        onClick={handleOnclick}
        id={id}
        className={classNames(className, isActive && 'active')}
      />
    );
  },
);

AbstractNavItem.propTypes = propTypes;
AbstractNavItem.defaultProps = defaultProps;

export default AbstractNavItem;
