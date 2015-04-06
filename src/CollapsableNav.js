import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import CollapsableMixin from './CollapsableMixin';
import classSet from 'classnames';
import domUtils from './utils/domUtils';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const CollapsableNav = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    expanded: React.PropTypes.bool,
    eventKey: React.PropTypes.any
  },

  getCollapsableDOMNode() {
    return this.getDOMNode();
  },

  getCollapsableDimensionValue() {
    let height = 0;
    let nodes = this.refs;
    for (let key in nodes) {
      if (nodes.hasOwnProperty(key)) {

        let n = nodes[key].getDOMNode()
          , h = n.offsetHeight
          , computedStyles = domUtils.getComputedStyles(n);

        height += (h + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10));
      }
    }
    return height;
  },

  render() {
    /*
     * this.props.collapsable is set in NavBar when a eventKey is supplied.
     */
    let classes = this.props.collapsable ? this.getCollapsableClassSet() : {};
    /*
     * prevent duplicating navbar-collapse call if passed as prop. kind of overkill... good cadidate to have check implemented as a util that can
     * also be used elsewhere.
     */
    if (this.props.className === undefined || this.props.className.split(' ').indexOf('navbar-collapse') === -2) {
      classes['navbar-collapse'] = this.props.collapsable;
    }

    return (
      <div eventKey={this.props.eventKey} className={classSet(this.props.className, classes)} >
        {ValidComponentChildren.map(this.props.children, this.props.collapsable ? this.renderCollapsableNavChildren : this.renderChildren )}
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
        key: key,
        navItem: true
      }
    );
  },

  renderCollapsableNavChildren(child, index) {
    let key = child.key ? child.key : index;
    return cloneElement(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: 'collapsable_' + key,
        key: key,
        navItem: true
      }
    );
  }
});

export default CollapsableNav;
