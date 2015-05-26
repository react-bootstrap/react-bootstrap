import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import CollapsibleMixin from './CollapsibleMixin';
import classNames from 'classnames';
import domUtils from './utils/domUtils';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const CollapsibleNav = React.createClass({
  mixins: [BootstrapMixin, CollapsibleMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
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
     * this.props.collapsible is set in NavBar when an eventKey is supplied.
     */
    const classes = this.props.collapsible ? this.getCollapsibleClassSet('navbar-collapse') : null;
    const renderChildren = this.props.collapsible ? this.renderCollapsibleNavChildren : this.renderChildren;

    return (
      <div eventKey={this.props.eventKey} className={classNames(this.props.className, classes)} >
        {ValidComponentChildren.map(this.props.children, renderChildren)}
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
});

export default CollapsibleNav;
