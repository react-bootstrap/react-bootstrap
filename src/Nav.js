import classNames from 'classnames';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import all from 'prop-types-extra/lib/all';
import React from 'react';
import uncontrollable from 'uncontrollable';

import {
  bsClass,
  bsStyles,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

import TabContext from './TabContext';
import mapContextToProps from './utils/mapContextToProps';
import NavContext from './NavContext';
import NavItem from './NavItem';
import NavLink from './NavLink';

// TODO: This `bsStyle` is very unlike the others. Should we rename it?

// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.

const propTypes = {
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

const defaultProps = {
  justified: false,
  fill: false,
  componentClass: 'ul'
};

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    onSelect: PropTypes.func
  })
};

const noop = () => {};

class Nav extends React.Component {
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
      fill,
      justified,
      onSelect,
      navbar: propsNavbar,
      componentClass: Component,
      className,
      children,
      ...props
    } = this.props;

    delete props.activeKey;
    delete props.onSelect;
    delete props.getControlledId;
    delete props.getControllerId;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'fill')]: fill,
      [prefix(bsProps, 'justified')]: justified
    };

    if (propsNavbar != null ? propsNavbar : this.context.$bs_navbar) {
      const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };
      classes[prefix(navbarProps, 'nav')] = true;
    }

    if (elementProps.role === 'tablist') {
      elementProps.onKeyDown = this.handleKeyDown;
    }

    return (
      <NavContext.Provider value={this.state.navContext}>
        <Component
          {...elementProps}
          ref={this.attachRef}
          className={classNames(className, classes)}
        >
          {children}
        </Component>
      </NavContext.Provider>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

const UncontrolledNav = uncontrollable(
  bsClass('nav', bsStyles(['tabs', 'pills'], Nav)),
  { activeKey: 'onSelect' }
);

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
