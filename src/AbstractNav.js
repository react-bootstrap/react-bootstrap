import React from 'react';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import mapContextToProps from 'react-context-toolbox/lib/mapContextToProps';
import { makeEventKey } from './SelectableContext';
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
    onSelect,
  }) {
    return {
      navContext: {
        role, // used by NavLink to determine it's role
        onSelect,
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

  handleKeyDown = event => {
    const { onKeyDown, onSelect } = this.props;
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
    onSelect(nextActiveChild.dataset.rbEventKey, event);
    this._needsRefocus = true;
  };

  attachRef = ref => {
    this.listNode = ref;
  };

  render() {
    const {
      onSelect: _,
      getControlledId: _1,
      getControllerId: _2,
      as: Component,
      ...props
    } = this.props;

    if (props.role === 'tablist') {
      props.onKeyDown = this.handleKeyDown;
    }

    return (
      <NavContext.Provider value={this.state.navContext}>
        <Component {...props} ref={this.attachRef} />
      </NavContext.Provider>
    );
  }
}

export default mapContextToProps(
  TabContext.Consumer,
  (tabContext, { role }) => {
    if (!tabContext) return null;

    const { activeKey, getControllerId, getControlledId } = tabContext;
    return {
      activeKey,
      role: role || 'tablist',
      // pass these two through to avoid having to listen to
      // both Tab and Nav contexts in NavLink
      getControllerId,
      getControlledId,
    };
  },
  AbstractNav,
);
