import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import uncontrollable from 'uncontrollable';

import TabContext from './TabContext';
import SelectableContext from './SelectableContext';

class TabContainer extends React.Component {
  static propTypes = {
    /**
     * HTML id attribute, required if no `generateChildId` prop
     * is specified.
     *
     * @type {string}
     */
    id(props, ...args) {
      let error = null;

      if (!props.generateChildId) {
        error = PropTypes.string(props, ...args);

        if (!error && !props.id) {
          error = new Error(
            'In order to properly initialize Tabs in a way that is accessible ' +
              'to assistive technologies (such as screen readers) an `id` or a ' +
              '`generateChildId` prop to TabContainer is required'
          );
        }
      }

      return error;
    },

    /**
     * Sets a default animation strategy for all children `<TabPane>`s. Use
     * `false` to disable, `true` to enable the default `<Fade>` animation or
     * a react-transition-group v2 `<Transition/>` component.
     *
     * @type {{Transition | false}}
     * @default {Fade}
     */
    transition: PropTypes.oneOfType([PropTypes.oneOf([false]), elementType]),
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
     * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${eventKey}`
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
    activeKey: PropTypes.any
  };

  static getDerivedStateFromProps(
    { activeKey, mountOnEnter, unmountOnExit, transition },
    prevState
  ) {
    return {
      tabContext: {
        ...prevState.tabContext,
        activeKey,
        mountOnEnter,
        unmountOnExit,
        transition
      }
    };
  }
  constructor(...args) {
    super(...args);

    this.state = {
      tabContext: {
        onSelect: this.props.onSelect,
        activeKey: this.props.activeKey,
        transition: this.props.transition,
        mountOnEnter: this.props.mountOnEnter,
        unmountOnExit: this.props.unmountOnExit,
        getControlledId: this.getControlledId,
        getControllerId: this.getControllerId
      }
    };
  }

  getKey(key, type) {
    const { generateChildId, id } = this.props;
    if (generateChildId) return generateChildId(key, type);
    return id ? `${id}-${type}-${key}` : null;
  }

  getControlledId = key => this.getKey(key, 'tabpane');
  getControllerId = key => this.getKey(key, 'tab');

  render() {
    const { children, onSelect } = this.props;

    return (
      <TabContext.Provider value={this.state.tabContext}>
        <SelectableContext.Provider value={onSelect}>
          {children}
        </SelectableContext.Provider>
      </TabContext.Provider>
    );
  }
}

export default uncontrollable(TabContainer, { activeKey: 'onSelect' });
