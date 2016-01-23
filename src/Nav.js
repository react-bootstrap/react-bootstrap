import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import all from 'react-prop-types/lib/all';
import warning from 'warning';
import keycode from 'keycode';
import tbsUtils, { bsStyles, bsClass as _bsClass } from './utils/bootstrapUtils';
import { nextEnabled, TAB, PANE } from './utils/tabUtils';

import ValidComponentChildren from './utils/ValidComponentChildren';
import chain from './utils/createChainedFunction';

class Nav extends React.Component {

  componentDidUpdate() {
    if (this._needsRefocus) {
      let ul = this.refs.ul && ReactDOM.findDOMNode(this.refs.ul);
      let tabs = ul ? ul.children || [] : [];
      let tabIdx = this.eventKeys().indexOf(this.getActiveKey());

      this._needsRefocus = false;

      if (tabIdx !== -1) {
        let tabNode = tabs[tabIdx];

        if (tabNode && tabNode.firstChild) {
          tabNode.firstChild.focus();
        }
      }
    }
  }

  render() {
    const { className } = this.props;
    const isNavbar = this.props.navbar != null ? this.props.navbar : this.context.$bs_navbar;

    const classes = tbsUtils.getClassSet(this.props);

    classes[tbsUtils.prefix(this.props, 'stacked')] = this.props.stacked;
    classes[tbsUtils.prefix(this.props, 'justified')] = this.props.justified;

    if (isNavbar) {
      let bsClass = this.context.$bs_navbar_bsClass || 'navbar';
      const navbarRight = this.props.pullRight;

      classes[tbsUtils.prefix({ bsClass }, 'nav')] = true;
      classes[tbsUtils.prefix({ bsClass }, 'right')] = navbarRight;
      classes[tbsUtils.prefix({ bsClass }, 'left')] = this.props.pullLeft;
    } else {
      classes['pull-right'] = this.props.pullRight;
      classes['pull-left'] = this.props.pullLeft;
    }

    let list = (
      <ul ref="ul"
        {...this.props}
        role={this.getNavRole()}
        className={classNames(className, classes)}
      >
        {ValidComponentChildren.map(this.props.children, this.renderNavItem, this)}
      </ul>
    );

    return list;
  }

  renderNavItem(child, index) {
    let onSelect = chain(child.props.onSelect, this.props.onSelect);
    let active = this.isChildActive(child);
    let tabProps = this.getTabProps(child, index, active, onSelect);

    return cloneElement(
      child,
      {
        active,
        onSelect,
        key: child.key || index,
        navItem: true,
        ...tabProps
      }
    );
  }

  getActiveKey(props = this.props, context = this.context) {
    let activeKey = props.activeKey;

    context = this.getContext('$bs_tabcontainer', context);

    if (context.activeKey) {
      warning(activeKey == null || props.activeHref,
        'Specifing a Nav `activeKey` or `activeHref` prop in the context of a `TabContainer` is not supported. ' +
        'Instead use `<TabContainer activeKey={' + activeKey + '} />`');

      activeKey = context.activeKey;
    }

    return activeKey;
  }

  isChildActive(child) {
    let activeKey = this.getActiveKey();

    if (this.context.$bs_tabcontainer) {
      warning(!child.props.active,
        'Specifing a NavItem `active` prop in the context of a `TabContainer` is not supported. Instead ' +
        'use `<TabContainer activeKey={' + child.props.eventKey + '} />`');

      return child.props.eventKey === activeKey;
    }

    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  }

  getTabProps(child, idx, isActive, onSelect) {
    let {
        linkId
      , 'aria-controls': controls
      , eventKey
      , role
      , onKeyDown
      , tabIndex = 0 } = child.props;

    let navRole = this.getNavRole();
    let context = this.getContext('$bs_tabcontainer');

    if (context.getId) {
      warning(!(linkId || controls),
        'In the context of a TabContainer, NavItems are given generated `linkId` and `aria-controls` ' +
        'attributes for the sake of proper component accessibility. Any provided ones will be ignored. ' +
        'To control these attributes directly provide a `generateChildId` prop to the parent TabContainer.'
      );

      linkId = context.getId(eventKey, TAB) || null;
      controls = context.getId(eventKey, PANE) || null;
      onSelect = chain(onSelect, context.onSelect);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = chain(
        this.handleTabKeyDown.bind(this, onSelect || (()=>{})),
        onKeyDown
      );
    }

    return {
      onSelect,
      linkId,
      role,
      onKeyDown,
      'aria-controls': controls,
      tabIndex: isActive ? tabIndex : -1
    };
  }

  handleTabKeyDown(onSelect, event) {
    let keys = this.eventKeys();
    let currentKey = this.getActiveKey() || keys[0];
    let next;

    switch (event.keyCode) {

    case keycode.codes.left:
    case keycode.codes.up:
      next = nextEnabled(this.props.children, currentKey, keys, false);

      if (next && next !== currentKey) {
        event.preventDefault();
        onSelect(next);
        this._needsRefocus = true;
      }
      break;
    case keycode.codes.right:
    case keycode.codes.down:
      next = nextEnabled(this.props.children, currentKey, keys, true);

      if (next && next !== currentKey) {
        event.preventDefault();
        onSelect(next);
        this._needsRefocus = true;
      }
      break;
    default:
    }
  }

  eventKeys() {
    let keys = [];
    ValidComponentChildren.forEach(this.props.children,
      ({props: { eventKey }}) => keys.push(eventKey));
    return keys;
  }

  getNavRole() {
    return this.props.role || (this.context.$bs_tabcontainer ? 'tablist' : null);
  }

  getContext(key) {
    return this.context[key] || {};
  }
}

Nav.propTypes = {

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: React.PropTypes.string,

  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: React.PropTypes.any,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: React.PropTypes.bool,

  justified: all(
    React.PropTypes.bool,
    ({justified, navbar}) => (
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
   * CSS classes for the wrapper `nav` element
   */
  className: React.PropTypes.string,
  /**
   * HTML id for the wrapper `nav` element
   */
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will be set
   * to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to the
   * ARIA authoring practices for tabs: https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
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

Nav.contextTypes = {
  $bs_navbar: React.PropTypes.bool,
  $bs_navbar_bsClass: React.PropTypes.string,
  $bs_deprecated_navbar: React.PropTypes.bool,

  $bs_tabcontainer: React.PropTypes.shape({
    activeKey: React.PropTypes.any,
    onSelect: React.PropTypes.func,
    getId: React.PropTypes.func
  })
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

export default _bsClass('nav',
  bsStyles(['tabs', 'pills'],
    Nav
  )
);
