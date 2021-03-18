import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import warning from 'warning';
import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';
import { BsPrefixRefForwardingComponent } from './helpers';
import { EventKey } from './types';

export interface AbstractNavItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  active?: boolean;
  as: React.ElementType;
  disabled?: boolean;
  eventKey?: EventKey;
  href?: string;
  tabIndex?: number;
  onSelect?: (navKey: string, e: any) => void;
}

const propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  role: PropTypes.string,

  href: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onclick: PropTypes.func,

  as: PropTypes.any,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,

  'aria-controls': PropTypes.string,
};

const defaultProps = {
  disabled: false,
};

const AbstractNavItem: BsPrefixRefForwardingComponent<
  'div',
  AbstractNavItemProps
> = React.forwardRef<HTMLElement, AbstractNavItemProps>(
  (
    { active, className, eventKey, onSelect, onClick, as: Component, ...props },
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
      if (props.disabled) {
        props.tabIndex = -1;
        props['aria-disabled'] = true;
      }
      props['aria-selected'] = isActive;
    }

    const handleOnclick = useEventCallback((e) => {
      onClick?.(e);
      if (navKey == null) return;
      onSelect?.(navKey, e);
      parentOnSelect?.(navKey, e);
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
