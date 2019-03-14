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
        className={classNames(className, isActive && 'active')}
      />
    );
  },
);

AbstractNavItem.propTypes = propTypes;
AbstractNavItem.defaultProps = defaultProps;

export default AbstractNavItem;
