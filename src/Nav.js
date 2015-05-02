import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import CollapsibleMixin from './CollapsibleMixin';
import classNames from 'classnames';
import domUtils from './utils/domUtils';
import {collapsable} from './utils/deprecationWarning';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const Nav = React.createClass({
  mixins: [BootstrapMixin, CollapsibleMixin],

  propTypes: {
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    collapsable,
    collapsible: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    navbar: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    pullRight: React.PropTypes.bool,
    right: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'nav'
    };
  },

  getCollapsibleDOMNode() {
    return React.findDOMNode(this);
  },

  getCollapsibleDimensionValue: function () {
    let node = React.findDOMNode(this.refs.ul),
        height = node.offsetHeight,
        computedStyles = domUtils.getComputedStyles(node);

    return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
  },

  render() {
    let collapsible = this.props.collapsible || this.props.collapsable;
    let classes = collapsible ? this.getCollapsibleClassSet() : {};

    classes['navbar-collapse'] = collapsible;

    if (this.props.navbar && !collapsible) {
      return (this.renderUl());
    }

    return (
      <nav {...this.props} className={classNames(this.props.className, classes)}>
        {this.renderUl()}
      </nav>
    );
  },

  renderUl() {
    let classes = this.getBsClassSet();

    classes['nav-stacked'] = this.props.stacked;
    classes['nav-justified'] = this.props.justified;
    classes['navbar-nav'] = this.props.navbar;
    classes['pull-right'] = this.props.pullRight;
    classes['navbar-right'] = this.props.right;

    return (
      <ul {...this.props} className={classNames(this.props.className, classes)} ref="ul">
        {ValidComponentChildren.map(this.props.children, this.renderNavItem)}
      </ul>
    );
  },

  getChildActiveProp(child) {
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
  },

  renderNavItem(child, index) {
    return cloneElement(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index,
        navItem: true
      }
    );
  }
});

export default Nav;
