import React, { useEffect, useState, useRef, useContext } from 'react';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import useMergedRefs from '@restart/hooks/useMergedRefs';

import SelectableContext, { makeEventKey } from './SelectableContext';
import NavContext from './NavContext';
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

const defaultProps = {
  role: 'tablist',
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
    const parentOnSelect = useContext(SelectableContext);
    const tabContext = useContext(TabContext);

    let getControlledId, getControllerId;

    if (tabContext) {
      activeKey = tabContext.activeKey;
      getControlledId = tabContext.getControlledId;
      getControllerId = tabContext.getControllerId;
    }

    const [needsRefocus, setRefocus] = useState(false);

    const listNode = useRef(null);

    const getNextActiveChild = offset => {
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

    const handleKeyDown = event => {
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
      setRefocus(true);
    };

    useEffect(() => {
      if (listNode.current && needsRefocus) {
        let activeChild = listNode.current.querySelector(
          '[data-rb-event-key].active',
        );

        if (activeChild) activeChild.focus();
      }
    }, [listNode, needsRefocus]);

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
AbstractNav.defaultProps = defaultProps;

export default AbstractNav;
