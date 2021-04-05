import * as React from 'react';
import { useMemo } from 'react';
import PropTypes, { Validator } from 'prop-types';
import { useUncontrolled } from 'uncontrollable';

import TabContext, { TabContextType } from './TabContext';
import SelectableContext from './SelectableContext';
import { SelectCallback, TransitionType } from './helpers';
import { EventKey } from './types';

export interface TabContainerProps extends React.PropsWithChildren<unknown> {
  id?: string;
  transition?: TransitionType;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  generateChildId?: (eventKey: EventKey, type: 'tab' | 'pane') => string;
  onSelect?: SelectCallback;
  activeKey?: EventKey;
  defaultActiveKey?: EventKey;
}

const validateId: Validator<string> = (props, ...args) => {
  let error: Error | null = null;

  if (!props.generateChildId) {
    error = PropTypes.string(props, ...args);

    if (!error && !props.id) {
      error = new Error(
        'In order to properly initialize Tabs in a way that is accessible ' +
          'to assistive technologies (such as screen readers) an `id` or a ' +
          '`generateChildId` prop to TabContainer is required',
      );
    }
  }

  return error;
};

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   *
   * @type {string}
   */
  id: validateId,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s.
   * Defaults to `<Fade>` animation; else, use `false` to disable, or a
   * custom react-transition-group `<Transition/>` component.
   *
   * @type {{Transition | false}}
   * @default {Fade}
   */
  transition: PropTypes.oneOfType([
    PropTypes.oneOf([false]),
    PropTypes.elementType,
  ]),
  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: PropTypes.bool,

  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${props.id}-${type}-${eventKey}`
   */
  generateChildId: PropTypes.func,

  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect: PropTypes.func,

  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const TabContainer = (props: TabContainerProps) => {
  const {
    id,
    generateChildId: generateCustomChildId,
    onSelect,
    activeKey,
    transition,
    mountOnEnter,
    unmountOnExit,
    children,
  } = useUncontrolled(props, { activeKey: 'onSelect' });

  const generateChildId = useMemo(
    () =>
      generateCustomChildId ||
      ((key: EventKey, type: string) => (id ? `${id}-${type}-${key}` : null)),
    [id, generateCustomChildId],
  );

  const tabContext: TabContextType = useMemo(
    () => ({
      onSelect,
      activeKey,
      transition,
      mountOnEnter: mountOnEnter || false,
      unmountOnExit: unmountOnExit || false,
      getControlledId: (key: EventKey) => generateChildId(key, 'tabpane'),
      getControllerId: (key: EventKey) => generateChildId(key, 'tab'),
    }),
    [
      onSelect,
      activeKey,
      transition,
      mountOnEnter,
      unmountOnExit,
      generateChildId,
    ],
  );

  return (
    <TabContext.Provider value={tabContext}>
      <SelectableContext.Provider value={onSelect || null}>
        {children}
      </SelectableContext.Provider>
    </TabContext.Provider>
  );
};

TabContainer.propTypes = propTypes;

export default TabContainer;
