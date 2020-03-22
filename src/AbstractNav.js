import qsa from 'dom-helpers/querySelectorAll';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import useForceUpdate from '@restart/hooks/useForceUpdate';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';
import TabContext from './TabContext';

const noop = () => {};

const propTypes = {
  onSelect: PropTypes.func.isRequired,

  as: PropTypes.elementType,

  role: PropTypes.string,

  /** @private */
  onKeyDown: PropTypes.func,
  /** @private */
  parentOnSelect: PropTypes.func,
  /** @private */
  getControlledId: PropTypes.func,
  /** @private */
  getControllerId: PropTypes.func,
  /** @private */
  activeKey: PropTypes.any,
};

const AbstractNav = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'ul',
      onSelect,
      activeKey,
      role,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
    // and don't want to reset the set in the effect
    const forceUpdate = useForceUpdate();
    const needsRefocusRef = useRef(false);

    const parentOnSelect = useContext(SelectableContext);
    const tabContext = useContext(TabContext);

    let getControlledId, getControllerId;

    if (tabContext) {
      role = role || 'tablist';
      activeKey = tabContext.activeKey;
      getControlledId = tabContext.getControlledId;
      getControllerId = tabContext.getControllerId;
    }

    const listNode = useRef(null);

    const getNextActiveChild = (offset) => {
      if (!listNode.current) return null;

      let items = qsa(listNode.current, '[data-rb-event-key]:not(.disabled)');
      let activeChild = listNode.current.querySelector('.active');

      let index = items.indexOf(activeChild);
      if (index === -1) return null;

      let nextIndex = index + offset;
      if (nextIndex >= items.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = items.length - 1;
      return items[nextIndex];
    };

    const handleSelect = (key, event) => {
      if (key == null) return;
      if (onSelect) onSelect(key, event);
      if (parentOnSelect) parentOnSelect(key, event);
    };

    const handleKeyDown = (event) => {
      if (onKeyDown) onKeyDown(event);

      let nextActiveChild;
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          nextActiveChild = getNextActiveChild(-1);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          nextActiveChild = getNextActiveChild(1);
          break;
        default:
          return;
      }
      if (!nextActiveChild) return;

      event.preventDefault();
      handleSelect(nextActiveChild.dataset.rbEventKey, event);
      needsRefocusRef.current = true;
      forceUpdate();
    };

    useEffect(() => {
      if (listNode.current && needsRefocusRef.current) {
        let activeChild = listNode.current.querySelector(
          '[data-rb-event-key].active',
        );

        if (activeChild) activeChild.focus();
      }

      needsRefocusRef.current = false;
    });

    const mergedRef = useMergedRefs(ref, listNode);

    return (
      <SelectableContext.Provider value={handleSelect}>
        <NavContext.Provider
          value={{
            role, // used by NavLink to determine it's role
            activeKey: makeEventKey(activeKey),
            getControlledId: getControlledId || noop,
            getControllerId: getControllerId || noop,
          }}
        >
          <Component
            {...props}
            onKeyDown={handleKeyDown}
            ref={mergedRef}
            role={role}
          />
        </NavContext.Provider>
      </SelectableContext.Provider>
    );
  },
);

AbstractNav.propTypes = propTypes;

export default AbstractNav;
