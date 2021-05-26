import qsa from 'dom-helpers/querySelectorAll';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';
import useForceUpdate from '@restart/hooks/useForceUpdate';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';
import TabContext from './TabContext';
import { BsPrefixRefForwardingComponent, SelectCallback } from './helpers';
import { EventKey } from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const propTypes = {
  onSelect: PropTypes.func,

  as: PropTypes.elementType,

  role: PropTypes.string,

  /** @private */
  onKeyDown: PropTypes.func,
  /** @private */
  parentOnSelect: PropTypes.func,
  /** @private */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

interface AbstractNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  activeKey?: EventKey;
  as?: React.ElementType;
  onSelect?: SelectCallback;
  parentOnSelect?: SelectCallback;
}

const AbstractNav: BsPrefixRefForwardingComponent<'ul', AbstractNavProps> =
  React.forwardRef<HTMLElement, AbstractNavProps>(
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

      const listNode = useRef<HTMLElement>(null);

      const getNextActiveChild = (offset: number) => {
        const currentListNode = listNode.current;
        if (!currentListNode) return null;

        const items = qsa(
          currentListNode,
          '[data-rb-event-key]:not(.disabled)',
        );
        const activeChild =
          currentListNode.querySelector<HTMLElement>('.active');
        if (!activeChild) return null;

        const index = items.indexOf(activeChild);
        if (index === -1) return null;

        let nextIndex = index + offset;
        if (nextIndex >= items.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = items.length - 1;
        return items[nextIndex];
      };

      const handleSelect = (key, event) => {
        if (key == null) return;
        onSelect?.(key, event);
        parentOnSelect?.(key, event);
      };

      const handleKeyDown = (event) => {
        onKeyDown?.(event);

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
          const activeChild = listNode.current.querySelector<HTMLElement>(
            '[data-rb-event-key].active',
          );

          activeChild?.focus();
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
