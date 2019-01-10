import React from 'react';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import SelectableContext, { makeEventKey } from './SelectableContext';
import NavContext from './NavContext';
import TabContext from './TabContext';

const noop = () => {};

class AbstractNav extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,

    as: elementType,

    /** @private */
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    as: 'ul',
  };

  constructor(...args) {
    super(...args);

    this.state = { navContext: null };
  }

  static getDerivedStateFromProps({
    activeKey,
    getControlledId,
    getControllerId,
    role,
  }) {
    return {
      navContext: {
        role, // used by NavLink to determine it's role
        activeKey: makeEventKey(activeKey),
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop,
      },
    };
  }

  componentDidUpdate() {
    if (!this._needsRefocus || !this.listNode) return;

    let activeChild = this.listNode.querySelector('[data-rb-event-key].active');
    if (activeChild) activeChild.focus();
  }

  getNextActiveChild(offset) {
    if (!this.listNode) return null;

    let items = qsa(this.listNode, '[data-rb-event-key]:not(.disabled)');
    let activeChild = this.listNode.querySelector('.active');

    let index = items.indexOf(activeChild);
    if (index === -1) return null;

    let nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  }

  handleSelect = (key, event) => {
    const { onSelect, parentOnSelect } = this.props;
    if (key == null) return;
    if (onSelect) onSelect(key, event);
    if (parentOnSelect) parentOnSelect(key, event);
  };

  handleKeyDown = event => {
    const { onKeyDown } = this.props;
    if (onKeyDown) onKeyDown(event);

    let nextActiveChild;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = this.getNextActiveChild(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = this.getNextActiveChild(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild) return;

    event.preventDefault();
    this.handleSelect(nextActiveChild.dataset.rbEventKey, event);
    this._needsRefocus = true;
  };

  attachRef = ref => {
    this.listNode = ref;
  };

  render() {
    const {
      as: Component,
      onSelect: _,
      parentOnSelect: _0,
      getControlledId: _1,
      getControllerId: _2,
      activeKey: _3,
      ...props
    } = this.props;

    if (props.role === 'tablist') {
      props.onKeyDown = this.handleKeyDown;
    }

    return (
      <SelectableContext.Provider value={this.handleSelect}>
        <NavContext.Provider value={this.state.navContext}>
          <Component
            {...props}
            onKeyDown={this.handleKeyDown}
            ref={this.attachRef}
          />
        </NavContext.Provider>
      </SelectableContext.Provider>
    );
  }
}

export default mapContextToProps(
  [SelectableContext, TabContext],
  (parentOnSelect, tabContext, { role }) => {
    if (!tabContext) return { parentOnSelect };

    const { activeKey, getControllerId, getControlledId } = tabContext;
    return {
      activeKey,
      parentOnSelect,
      role: role || 'tablist',
      // pass these two through to avoid having to listen to
      // both Tab and Nav contexts in NavLink
      getControllerId,
      getControlledId,
    };
  },
  AbstractNav,
);
