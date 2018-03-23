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
import NavbarContext from './NavbarContext';
import NavItem from './NavItem';
import NavLink from './NavLink';

const noop = () => {};

class Nav extends React.Component {
  static propTypes = {
    /**
     * @default 'nav'
     */
    bsPrefix: PropTypes.string,

    /** @private */
    navbarBsPrefix: PropTypes.string,

    /**
     * The visual variant of the nav items.
     *
     * @type {('tabs'|'pills')}
     */
    variant: PropTypes.string,

    /**
     * Marks the NavItem with a matching `eventKey` (or `href` if present) as active.
     *
     * @type {string}
     */
    activeKey: PropTypes.any,

    /**
     * Have all `NavItem`s to proportionatly fill all available width.
     */
    fill: PropTypes.bool,

    /**
     * Have all `NavItem`s to evenly fill all available width.
     *
     * @type {boolean}
     */
    justify: all(
      PropTypes.bool,
      ({ justify, navbar }) =>
        justify && navbar
          ? Error('justify navbar `Nav`s are not supported')
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
     * When the role is "tablist", NavLink focus is managed according to
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
    justify: false,
    fill: false,
    componentClass: 'ul'
  };

  static getDerivedStateFromProps({
    activeKey,
    getControlledId,
    getControllerId,
    role,
    onSelect
  }) {
    return {
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

    let activeChild = this.listNode.querySelector('[data-rb-event-key].active');
    if (activeChild) activeChild.focus();
  }

  getNextActiveChild(offset) {
    if (!this.listNode) return null;

    let items = qsa(this.listNode, '[data-rb-event-key]:not(.disabled)');
    let activeChild = this.listNode.querySelector('.active');

    let index = items.indexOf(activeChild);
    return index === -1 ? null : items[index + offset];
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
      navbarBsPrefix,
      variant,
      fill,
      justify,
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

    if (props.role === 'tablist') {
      props.onKeyDown = this.handleKeyDown;
    }

    return (
      <NavContext.Provider value={this.state.navContext}>
        <Component
          {...props}
          ref={this.attachRef}
          className={classNames(className, {
            [bsPrefix]: !navbar,
            [`${navbarBsPrefix}-nav`]: navbar,
            [`${bsPrefix}-${variant}`]: !!variant,
            [`${bsPrefix}-fill`]: fill,
            [`${bsPrefix}-justified`]: justify
          })}
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
  [TabContext.Consumer, NavbarContext.Consumer],
  (tabContext, navbarContext, { role, navbar }) => {
    if (!tabContext && !navbarContext) return null;

    if (navbarContext)
      return {
        onSelect: navbarContext.onSelect,
        navbarBsPrefix: navbarContext.bsPrefix,
        navbar: navbar == null ? true : navbar
      };

    const {
      activeKey,
      onSelect,
      getControllerId,
      getControlledId
    } = tabContext;

    return {
      activeKey,
      onSelect,
      getControllerId,
      getControlledId,
      role: role || 'tablist'
    };
  }
);

DecoratedNav.Item = NavItem;
DecoratedNav.Link = NavLink;

DecoratedNav._Nav = Nav; // for Testing until enzyme is working with context

export default DecoratedNav;
