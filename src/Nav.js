import classNames from 'classnames';
import keycode from 'keycode';
import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import all from 'react-prop-types/lib/all';
import warning from 'warning';

import { bsClass, bsStyles, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?

// TODO: This `bsStyle` is very unlike the others. Should we rename it?

// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.

const propTypes = {
  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: React.PropTypes.any,

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: React.PropTypes.string,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: React.PropTypes.bool,

  justified: all(
    React.PropTypes.bool,
    ({ justified, navbar }) => (
      justified && navbar ?
        Error('justified navbar `Nav`s are not supported') : null
    )
  ),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   */
  onSelect: React.PropTypes.func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: React.PropTypes.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: React.PropTypes.bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: React.PropTypes.bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: React.PropTypes.bool,
};

const defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false,
};

const contextTypes = {
  $bs_navbar: React.PropTypes.shape({
    bsClass: React.PropTypes.string,
  }),

  $bs_tabContainer: React.PropTypes.shape({
    activeKey: React.PropTypes.any,
    onSelect: React.PropTypes.func.isRequired,
    getTabId: React.PropTypes.func.isRequired,
    getPaneId: React.PropTypes.func.isRequired,
  }),
};

class Nav extends React.Component {
  componentDidUpdate() {
    if (!this._needsRefocus) {
      return;
    }

    this._needsRefocus = false;

    const { children } = this.props;
    const activeChild = ValidComponentChildren.find(children, child => (
      this.isChildActive(child)
    ));

    const childrenArray = ValidComponentChildren.toArray(children);
    const activeChildIndex = childrenArray.indexOf(activeChild);

    const childNodes = ReactDOM.findDOMNode(this).children;
    const activeNode = childNodes && childNodes[activeChildIndex];

    if (!activeNode || !activeNode.firstChild) {
      return;
    }

    activeNode.firstChild.focus();
  }

  handleTabKeyDown(onSelect, event) {
    let nextActiveChild;

    switch (event.keyCode) {
      case keycode.codes.left:
      case keycode.codes.up:
        nextActiveChild = this.getNextActiveChild(-1);
        break;
      case keycode.codes.right:
      case keycode.codes.down:
        nextActiveChild = this.getNextActiveChild(1);
        break;
      default:
        // It was a different key; don't handle this keypress.
        return;
    }

    event.preventDefault();

    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey) {
      onSelect(nextActiveChild.props.eventKey);
    }

    this._needsRefocus = true;
  }

  getNextActiveChild(offset) {
    const { children } = this.props;
    const validChildren = children.filter(child => (
      child.props.eventKey && !child.props.disabled
    ));

    const activeChild = ValidComponentChildren.find(children, child => (
      this.isChildActive(child)
    ));

    // This assumes the active child is not disabled.
    const activeChildIndex = validChildren.indexOf(activeChild);
    if (activeChildIndex === -1) {
      // Something has gone wrong. Select the first valid child we can find.
      return validChildren[0];
    }

    let nextIndex = activeChildIndex + offset;
    const numValidChildren = validChildren.length;

    if (nextIndex >= numValidChildren) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = numValidChildren - 1;
    }

    return validChildren[nextIndex];
  }

  isChildActive(child) {
    const { activeKey, activeHref } = this.props;
    const tabContainer = this.context.$bs_tabContainer;

    if (tabContainer) {
      const childKey = child.props.eventKey;

      warning(!child.props.active,
        'Specifying a `<NavItem>` `active` prop in the context of a ' +
        '`<TabContainer>` is not supported. Instead use `<TabContainer ' +
        `activeKey={${childKey}} />\``
      );

      const active = childKey === tabContainer.activeKey;

      // Only warn on the active child to avoid spamming the console.
      warning(!active || activeKey == null && !activeHref,
        'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' +
        'a `<TabContainer>` is not supported. Instead use `<TabContainer ' +
        `activeKey={${childKey}} />\``
      );

      return active;
    }

    if (child.props.active) {
      return true;
    }

    if (activeKey != null && child.props.eventKey === activeKey) {
      return true;
    }

    if (activeHref && child.props.href === activeHref) {
      return true;
    }

    return child.props.active;
  }

  getTabProps(child, tabContainer, navRole, active, onSelect) {
    if (!tabContainer && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    let {
      id,
      'aria-controls': controls,
      eventKey,
      role,
      onKeyDown,
      tabIndex,
    } = child.props;

    if (tabContainer) {
      warning(!id && !controls,
        'In the context of a `<TabContainer>`, `<NavItem>`s are given ' +
        'generated `id` and `aria-controls` attributes for the sake of ' +
        'proper component accessibility. Any provided ones will be ignored. ' +
        'To control these attributes directly, provide a `generateChildId` ' +
        'prop to the parent `<TabContainer>`.'
      );

      id = tabContainer.getTabId(eventKey);
      controls = tabContainer.getPaneId(eventKey);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = createChainedFunction(
        event => this.handleTabKeyDown(onSelect, event), onKeyDown
      );
      tabIndex = active ? tabIndex : -1;
    }

    return {
      id,
      role,
      onKeyDown,
      'aria-controls': controls,
      tabIndex,
    };
  }

  render() {
    const {
      activeKey,
      activeHref,
      stacked,
      justified,
      onSelect,
      role: propsRole,
      navbar: propsNavbar,
      pullRight,
      pullLeft,
      className,
      children,
      ...props,
    } = this.props;

    const tabContainer = this.context.$bs_tabContainer;
    const role = propsRole || (tabContainer ? 'tablist' : null);

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'stacked')]: stacked,
      [prefix(bsProps, 'justified')]: justified,
    };

    const navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
    let pullLeftClassName;
    let pullRightClassName;

    if (navbar) {
      const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

      classes[prefix(navbarProps, 'nav')] = true;

      pullRightClassName = prefix(navbarProps, 'right');
      pullLeftClassName = prefix(navbarProps, 'left');
    } else {
      pullRightClassName = 'pull-right';
      pullLeftClassName = 'pull-left';
    }

    classes[pullRightClassName] = pullRight;
    classes[pullLeftClassName] = pullLeft;

    return (
      <ul
        {...elementProps}
        role={role}
        className={classNames(className, classes)}
      >
        {ValidComponentChildren.map(children, child => {
          const active = this.isChildActive(child);
          const childOnSelect = createChainedFunction(
            child.props.onSelect,
            onSelect,
            tabContainer && tabContainer.onSelect
          );

          return cloneElement(child, {
            ...this.getTabProps(
              child, tabContainer, role, active, childOnSelect
            ),
            active,
            activeKey,
            activeHref,
            onSelect: childOnSelect,
          });
        })}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

export default bsClass('nav',
  bsStyles(['tabs', 'pills'], Nav)
);
