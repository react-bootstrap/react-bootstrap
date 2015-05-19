import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import CollapsibleMixin from './CollapsibleMixin';
import classNames from 'classnames';
import domUtils from './utils/domUtils';
import collapsable from './utils/deprecatedProperty';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const specCollapsibleNav = {
  mixins: [BootstrapMixin, CollapsibleMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    collapsable,
    collapsible: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any
  },

  getCollapsibleDOMNode() {
    return React.findDOMNode(this);
  },

  getCollapsibleDimensionValue() {
    let height = 0;
    let nodes = this.refs;
    for (let key in nodes) {
      if (nodes.hasOwnProperty(key)) {

        let n = React.findDOMNode(nodes[key])
          , h = n.offsetHeight
          , computedStyles = domUtils.getComputedStyles(n);

        height += (h +
          parseInt(computedStyles.marginTop, 10) +
          parseInt(computedStyles.marginBottom, 10)
        );
      }
    }
    return height;
  },

  render() {
    /*
     * this.props.collapsible is set in NavBar when a eventKey is supplied.
     */
    const collapsible = this.props.collapsible || this.props.collapsable;
    let classes = collapsible ? this.getCollapsibleClassSet() : {};
    /*
     * prevent duplicating navbar-collapse call if passed as prop.
     * kind of overkill...
     * good cadidate to have check implemented as an util that can
     * also be used elsewhere.
     */
    if (this.props.className === undefined ||
      this.props.className.split(' ').indexOf('navbar-collapse') === -2) {
      classes['navbar-collapse'] = collapsible;
    }

    return (
      <div eventKey={this.props.eventKey} className={classNames(this.props.className, classes)} >
        {ValidComponentChildren.map(this.props.children,
          collapsible ?
          this.renderCollapsibleNavChildren :
          this.renderChildren
        )}
      </div>
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

  renderChildren(child, index) {
    let key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        ref: 'nocollapse_' + key,
        key,
        navItem: true
      }
    );
  },

  renderCollapsibleNavChildren(child, index) {
    let key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: 'collapsible_' + key,
        key,
        navItem: true
      }
    );
  }
};

const CollapsibleNav = React.createClass(specCollapsibleNav);

export {specCollapsibleNav};
export default CollapsibleNav;
