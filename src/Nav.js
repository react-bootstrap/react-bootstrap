import classNames from 'classnames';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import all from 'prop-types-extra/lib/all';
import React from 'react';
import uncontrollable from 'uncontrollable';

import { createBootstrapComponent } from './ThemeProvider';
import TabContext from './TabContext';
import mapContextToProps from './utils/mapContextToProps';
import NavContext from './NavContext';
import NavItem from './NavItem';
import NavLink from './NavLink';

const noop = () => {};

class Nav extends React.Component {
  static propTypes = {
    /**
     * @default 'nav'
     */
    bsPrefix: PropTypes.string,

    /**
     * The visual variant of the nav items.
     *
     * @type {('tabs'|'pills')}
     */
    variant: PropTypes.string,

    /**
     * Marks the NavItem with a matching `eventKey` as active. Has a
     * higher precedence over `activeHref`.
     */
    activeKey: PropTypes.any,

    /**
     * NavItems are be positioned vertically.
     */
    fill: PropTypes.bool,

    justified: all(
      PropTypes.bool,
      ({ justified, navbar }) =>
        justified && navbar
          ? Error('justified navbar `Nav`s are not supported')
          : null
    ),

    /**
     * A callback fired when a NavItem is selected.
     *
     * ```js
     * function (
     *  Any eventKey,
     *  SyntheticEvent event?
     * )
     * ```
     */
    onSelect: PropTypes.func,

    /**
     * ARIA role for the Nav, in the context of a TabContainer, the default will
     * be set to "tablist", but can be overridden by the Nav when set explicitly.
     *
     * When the role is set to "tablist" NavItem focus is managed according to
     * the ARIA authoring practices for tabs:
     * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
     */
    role: PropTypes.string,

    /**
     * Apply styling an alignment for use in a Navbar. This prop will be set
     * automatically when the Nav is used inside a Navbar.
     */
    navbar: PropTypes.bool,

    componentClass: elementType,

    /** @private */
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    justified: false,
    fill: false,
    componentClass: 'ul'
  };

  static getDerivedStateFromProps(
    { activeKey, getControlledId, getControllerId, role, onSelect },
    prevState
  ) {
    return {
      ...prevState,
      navContext: {
        role, // used by NavLink to determine it's role
        onSelect,
        activeKey,
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop
      }
    };
  }

  constructor(...args) {
    super(...args);

    this.state = { navContext: null };
  }

  componentDidUpdate() {
    if (!this._needsRefocus || !this.listNode) return;

    let activeChild = qsa(this.listNode, `.nav-link.active`).pop();
    if (activeChild) activeChild.focus();
  }

  getNextActiveChild(offset) {
    if (!this.listNode) return null;
    const itemSelector = '.nav-link:not(.disabled)';

    let items = qsa(this.listNode, itemSelector);
    let activeChild = qsa(this.listNode, `${itemSelector}.active`).pop();

    return items[items.indexOf(activeChild) + offset];
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
    onSelect(nextActiveChild.dataset.rbEventKey);
    this._needsRefocus = true;
  };

  attachRef = ref => {
    this.listNode = ref;
  };

  render() {
    const {
      bsPrefix,
      variant,
      fill,
      justified,
      onSelect,
      navbar,
      className,
      children,
      componentClass: Component,
      ...props
    } = this.props;

    delete props.activeKey;
    delete props.onSelect;
    delete props.getControlledId;
    delete props.getControllerId;

    const classes = {
      [bsPrefix]: !navbar,
      [`navbar-nav`]: navbar,
      [`${bsPrefix}-${variant}`]: !!variant,
      [`${bsPrefix}-fill`]: fill,
      [`${bsPrefix}-justified`]: justified
    };

    if (props.role === 'tablist') {
      props.onKeyDown = this.handleKeyDown;
    }

    return (
      <NavContext.Provider value={this.state.navContext}>
        <Component
          {...props}
          ref={this.attachRef}
          className={classNames(className, classes)}
        >
          {children}
        </Component>
      </NavContext.Provider>
    );
  }
}

const UncontrolledNav = uncontrollable(createBootstrapComponent(Nav, 'nav'), {
  activeKey: 'onSelect'
});

const DecoratedNav = mapContextToProps(
  UncontrolledNav,
  TabContext.Consumer,
  (context, props) => {
    if (!context) return null;
    const { activeKey, onSelect, getControllerId, getControlledId } = context;
    return {
      activeKey,
      onSelect,
      getControllerId,
      getControlledId,
      role: props.role || 'tablist'
    };
  }
);

DecoratedNav.Item = NavItem;
DecoratedNav.Link = NavLink;

DecoratedNav._Nav = Nav; // for Testing until enzyme is working with context

export default DecoratedNav;
