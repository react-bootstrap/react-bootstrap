import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import warning from 'warning';
import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';

const propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  role: PropTypes.string,

  href: PropTypes.string,
  tabIndex: PropTypes.string,
  eventKey: PropTypes.any,
  onclick: PropTypes.func,

  as: PropTypes.any,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,

  'aria-controls': PropTypes.string,
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
      ...props
    },
    ref,
  ) => {
    const navKey = makeEventKey(eventKey, props.href);
    const parentOnSelect = useContext(SelectableContext);
    const navContext = useContext(NavContext);

    let isActive = active;
    if (navContext) {
      if (!props.role && navContext.role === 'tablist') props.role = 'tab';

      const contextControllerId = navContext.getControllerId(navKey);
      const contextControlledId = navContext.getControlledId(navKey);

      warning(
        !contextControllerId || !props.id,
        `[react-bootstrap] The provided id '${props.id}' was overwritten by the current navContext with '${contextControllerId}'.`,
      );
      warning(
        !contextControlledId || !props['aria-controls'],
        `[react-bootstrap] The provided aria-controls value '${props['aria-controls']}' was overwritten by the current navContext with '${contextControlledId}'.`,
      );

      props['data-rb-event-key'] = navKey;
      props.id = contextControllerId || props.id;
      props['aria-controls'] = contextControlledId || props['aria-controls'];

      isActive =
        active == null && navKey != null
          ? navContext.activeKey === navKey
          : active;
    }

    if (props.role === 'tab') {
      props.tabIndex = isActive ? tabIndex : -1;
      props['aria-selected'] = isActive;
    }

    const handleOnclick = useEventCallback((e) => {
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
        className={classNames(className, isActive && 'active')}
      />
    );
  },
);

AbstractNavItem.propTypes = propTypes;
AbstractNavItem.defaultProps = defaultProps;

export default AbstractNavItem;
