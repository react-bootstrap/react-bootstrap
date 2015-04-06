import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import CollapsableMixin from './CollapsableMixin';
import classSet from 'classnames';
import domUtils from './utils/domUtils';


import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const Nav = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    collapsable: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    navbar: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    right: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'nav'
    };
  },

  getCollapsableDOMNode() {
    return React.findDOMNode(this);
  },

  getCollapsableDimensionValue: function () {
    let node = React.findDOMNode(this.refs.ul),
        height = node.offsetHeight,
        computedStyles = domUtils.getComputedStyles(node);

    return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
  },

  render() {
    let classes = this.props.collapsable ? this.getCollapsableClassSet() : {};

    classes['navbar-collapse'] = this.props.collapsable;

    if (this.props.navbar && !this.props.collapsable) {
      return (this.renderUl());
    }

    return (
      <nav {...this.props} className={classSet(this.props.className, classes)}>
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
      <ul {...this.props} className={classSet(this.props.className, classes)} ref="ul">
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
