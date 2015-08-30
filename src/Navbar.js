import React, { cloneElement } from 'react';
import tbsUtils from './utils/bootstrapUtils';
import classNames from 'classnames';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';
import elementType from 'react-prop-types/lib/elementType';

const Navbar = React.createClass({

  propTypes: {
    ...tbsUtils.propTypes,
    fixedTop: React.PropTypes.bool,
    fixedBottom: React.PropTypes.bool,
    staticTop: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    fluid: React.PropTypes.bool,
    role: React.PropTypes.string,
    /**
     * You can use a custom element for this component
     */
    componentClass: elementType,
    brand: React.PropTypes.node,
    toggleButton: React.PropTypes.node,
    toggleNavKey: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onToggle: React.PropTypes.func,
    navExpanded: React.PropTypes.bool,
    defaultNavExpanded: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: 'nav',
      fixedTop: false,
      fixedBottom: false,
      staticTop: false,
      inverse: false,
      fluid: false,
      defaultNavExpanded: false
    };
  },

  getInitialState() {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle() {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navExpanded: !this.state.navExpanded
    });
  },

  isNavExpanded() {
    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
  },

  render() {
    let classes = tbsUtils.getClassSet(this.props);
    let ComponentClass = this.props.componentClass;

    classes[tbsUtils.prefix(this.props, 'fixed-top')] = this.props.fixedTop;
    classes[tbsUtils.prefix(this.props, 'fixed-bottom')] = this.props.fixedBottom;
    classes[tbsUtils.prefix(this.props, 'static-top')] = this.props.staticTop;
    classes[tbsUtils.prefix(this.props, 'inverse')] = this.props.inverse;

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, classes)}>
        <div className={this.props.fluid ? 'container-fluid' : 'container'}>
          {(this.props.brand || this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderHeader() : null}
          {ValidComponentChildren.map(this.props.children, this.renderChild)}
        </div>
      </ComponentClass>
    );
  },

  renderChild(child, index) {
    return cloneElement(child, {
      navbar: true,
      collapsible: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
      key: child.key ? child.key : index
    });
  },

  renderHeader() {
    let brand;
    let headerClass = tbsUtils.prefix(this.props, 'header');
    let brandClass = tbsUtils.prefix(this.props, 'brand');

    if (this.props.brand) {
      if (React.isValidElement(this.props.brand)) {
        brand = cloneElement(this.props.brand, {
          className: classNames(this.props.brand.props.className, brandClass)
        });
      } else {
        brand = <span className={brandClass}>{this.props.brand}</span>;
      }
    }

    return (
      <div className={headerClass}>
        {brand}
        {(this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderToggleButton() : null}
      </div>
    );
  },

  renderToggleButton() {
    let children;
    let toggleClass =  tbsUtils.prefix(this.props, 'toggle');

    if (React.isValidElement(this.props.toggleButton)) {

      return cloneElement(this.props.toggleButton, {
        className: classNames(this.props.toggleButton.props.className, toggleClass),
        onClick: createChainedFunction(this.handleToggle, this.props.toggleButton.props.onClick)
      });
    }

    children = (this.props.toggleButton != null) ?
      this.props.toggleButton : [
        <span className="sr-only" key={0}>Toggle navigation</span>,
        <span className="icon-bar" key={1}></span>,
        <span className="icon-bar" key={2}></span>,
        <span className="icon-bar" key={3}></span>
      ];

    return (
      <button className={toggleClass} type="button" onClick={this.handleToggle}>
        {children}
      </button>
    );
  }
});

export default Navbar;
