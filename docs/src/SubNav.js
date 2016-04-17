import React, { cloneElement } from 'react';
import classNames from 'classnames';

import ValidComponentChildren from '../../src/utils/ValidComponentChildren';
import createChainedFunction from '../../src/utils/createChainedFunction';
import SafeAnchor from '../../src/SafeAnchor';

const SubNav = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    active: React.PropTypes.bool,
    activeHref: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    eventKey: React.PropTypes.any,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    text: React.PropTypes.node,
    target: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'nav',
      active: false,
      disabled: false
    };
  },

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  },

  isActive({ props }) {
    if (props.active) {
      return true;
    }

    if (this.props.activeKey != null && this.props.activeKey === props.eventKey) {
      return true;
    }

    if (this.props.activeHref != null && this.props.activeHref === props.href) {
      return true;
    }

    if (props.children) {
      return ValidComponentChildren.some(
        props.children,
        child => this.isActive(child)
      );
    }

    return false;
  },

  getChildActive(child) {
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

  render() {
    const classes = {
      active: this.isActive(this),
      disabled: this.props.disabled
    };

    return (
      <li {...this.props} className={classNames(this.props.className, classes)}>
        <SafeAnchor
          href={this.props.href}
          title={this.props.title}
          target={this.props.target}
          onClick={this.handleClick}
        >
          {this.props.text}
        </SafeAnchor>

        <ul className="nav">
          {ValidComponentChildren.map(this.props.children, this.renderNavItem)}
        </ul>
      </li>
    );
  },

  renderNavItem(child, index) {
    return cloneElement(
      child,
      {
        active: this.getChildActive(child),
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      }
    );
  }
});

export default SubNav;
