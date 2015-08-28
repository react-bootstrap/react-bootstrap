import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import Collapse from './Collapse';
import classNames from 'classnames';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const Nav = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    bsStyle: React.PropTypes.oneOf(['tabs', 'pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    collapsible: React.PropTypes.bool,
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
     * CSS classes for the inner `ul` element
     */
    ulClassName: React.PropTypes.string,
    /**
     * HTML id for the inner `ul` element
     */
    ulId: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    navbar: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    pullRight: React.PropTypes.bool,
    right: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'nav',
      collapsible: false,
      expanded: true,
      justified: false,
      navbar: false,
      pullRight: false,
      right: false,
      stacked: false
    };
  },

  render() {
    const classes = this.props.collapsible ? 'navbar-collapse' : null;

    if (this.props.navbar && !this.props.collapsible) {
      return (this.renderUl());
    }

    return (
      <Collapse in={this.props.expanded}>
        <nav {...this.props} className={classNames(this.props.className, classes)}>
          {this.renderUl()}
        </nav>
      </Collapse>
    );
  },

  renderUl() {
    const classes = this.getBsClassSet();

    classes['nav-stacked'] = this.props.stacked;
    classes['nav-justified'] = this.props.justified;
    classes['navbar-nav'] = this.props.navbar;
    classes['pull-right'] = this.props.pullRight;
    classes['navbar-right'] = this.props.right;

    return (
      <ul {...this.props}
        role={this.props.bsStyle === 'tabs' ? 'tablist' : null}
        className={classNames(this.props.ulClassName, classes)}
        id={this.props.ulId}
        ref="ul"
      >
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
        role: this.props.bsStyle === 'tabs' ? 'tab' : null,
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
