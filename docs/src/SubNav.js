import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import classNames from 'classnames';

import ValidComponentChildren from '../../src/utils/ValidComponentChildren';
import createChainedFunction from '../../src/utils/createChainedFunction';
import SafeAnchor from '../../src/SafeAnchor';

class SubNav extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    active: PropTypes.bool,
    activeHref: PropTypes.string,
    activeKey: PropTypes.any,
    disabled: PropTypes.bool,
    eventKey: PropTypes.any,
    href: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.node,
    target: PropTypes.string
  };

  static defaultProps = {
    bsClass: 'nav',
    active: false,
    disabled: false
  };

  handleClick = (e) => {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  };

  isActive = () => {
    return this.isChildActive(this);
  };

  isChildActive = (child) => {
    if (child.props.active) {
      return true;
    }

    if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
      return true;
    }

    if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
      return true;
    }

    if (child.props.children) {
      let isActive = false;

      ValidComponentChildren.forEach(
        child.props.children,
        grandchild => {
          if (this.isChildActive(grandchild)) {
            isActive = true;
          }
        },
        this
      );

      return isActive;
    }

    return false;
  };

  getChildActiveProp = (child) => {
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
  };

  render() {
    let classes = {
      'active': this.isActive(),
      'disabled': this.props.disabled
    };

    return (
      <li {...this.props} className={classNames(this.props.className, classes)}>
        <SafeAnchor
          href={this.props.href}
          title={this.props.title}
          target={this.props.target}
          onClick={this.handleClick}>
          {this.props.text}
        </SafeAnchor>
        <ul className="nav">
          {ValidComponentChildren.map(this.props.children, this.renderNavItem)}
        </ul>
      </li>
    );
  }

  renderNavItem = (child, index) => {
    return cloneElement(
      child,
      {
        active: this.getChildActiveProp(child),
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      }
    );
  };
}

export default SubNav;
