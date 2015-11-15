import React from 'react';
import classNames from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import elementType from 'react-prop-types/lib/elementType';

import Grid from '../Grid';
import NavBrand from '../NavBrand';

import tbsUtils, { bsClass, bsStyles } from '../utils/bootstrapUtils';
import { DEFAULT, INVERSE } from '../styleMaps';
import createChainedFunction from '../utils/createChainedFunction';
import ValidComponentChildren from '../utils/ValidComponentChildren';

const Navbar = React.createClass({

  propTypes: {
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
    brand: deprecated(React.PropTypes.node, 'Use the `NavBrand` component.'),
    toggleButton: React.PropTypes.node,
    toggleNavKey: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onToggle: React.PropTypes.func,
    navExpanded: React.PropTypes.bool,
    defaultNavExpanded: React.PropTypes.bool
  },

  // TODO Remove in 0.29
  childContextTypes: {
    $bs_deprecated_navbar: React.PropTypes.bool
  },

  getChildContext() {
    return {
      $bs_deprecated_navbar: true
    };
  },

  getDefaultProps() {
    return {
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

  hasNavBrandChild() {
    return ValidComponentChildren.findValidComponents(
      this.props.children, child => child.props.bsRole === 'brand'
    ).length > 0;
  },

  render() {
    const {
      brand,
      toggleButton,
      toggleNavKey,
      fixedTop,
      fixedBottom,
      staticTop,
      inverse,
      componentClass: ComponentClass,
      fluid,
      className,
      children,
      ...props
    } = this.props;

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (props.role === undefined && ComponentClass !== 'nav') {
      props.role = 'navigation';
    }

    const classes = tbsUtils.getClassSet(this.props);

    classes[tbsUtils.prefix(this.props, 'fixed-top')] = this.props.fixedTop;
    classes[tbsUtils.prefix(this.props, 'fixed-bottom')] = this.props.fixedBottom;
    classes[tbsUtils.prefix(this.props, 'static-top')] = this.props.staticTop;

    // handle built-in styles manually to provide the convenience `inverse` prop
    classes[tbsUtils.prefix(this.props, INVERSE)] = this.props.inverse;
    classes[tbsUtils.prefix(this.props, DEFAULT)] = !this.props.inverse;

    const showHeader =
      (brand || toggleButton || toggleNavKey != null) &&
      !this.hasNavBrandChild();

    return (
      <ComponentClass {...props} className={classNames(className, classes)}>
        <Grid fluid={fluid}>
          {showHeader ? this.renderBrandHeader() : null}
          {ValidComponentChildren.map(children, this.renderChild)}
        </Grid>
      </ComponentClass>
    );
  },

  renderBrandHeader() {
    let {brand} = this.props;
    if (brand) {
      brand = <NavBrand>{brand}</NavBrand>;
    }

    return this.renderHeader(brand);
  },


  renderHeader(brand) {
    const hasToggle = this.props.toggleButton || this.props.toggleNavKey != null;
    const headerClass = tbsUtils.prefix(this.props, 'header');

    return (
      <div className={headerClass}>
        {brand}
        {hasToggle ? this.renderToggleButton() : null}
      </div>
    );
  },

  renderChild(child, index) {
    const key = child.key != null ? child.key : index;

    if (child.props.bsRole === 'brand') {
      return React.cloneElement(this.renderHeader(child), {key});
    }

    const {toggleNavKey} = this.props;
    const collapsible =
      toggleNavKey != null && toggleNavKey === child.props.eventKey;

    return React.cloneElement(child, {
      navbar: true,
      collapsible,
      expanded: collapsible && this.isNavExpanded(),
      key
    });
  },

  renderToggleButton() {
    const {toggleButton} = this.props;
    const toggleClass = tbsUtils.prefix(this.props, 'toggle');

    if (React.isValidElement(toggleButton)) {
      return React.cloneElement(toggleButton, {
        className: classNames(toggleButton.props.className, toggleClass),
        onClick: createChainedFunction(
          this.handleToggle, toggleButton.props.onClick
        )
      });
    }

    let children;
    if (toggleButton != null) {
      children = toggleButton;
    } else {
      children = [
        <span className="sr-only" key={0}>Toggle navigation</span>,
        <span className="icon-bar" key={1}></span>,
        <span className="icon-bar" key={2}></span>,
        <span className="icon-bar" key={3}></span>
      ];
    }

    return (
      <button
        type="button"
        onClick={this.handleToggle}
        className={toggleClass}
      >
        {children}
      </button>
    );
  }

});

const NAVBAR_STATES = [DEFAULT, INVERSE];

export default bsStyles(NAVBAR_STATES, DEFAULT,
  bsClass('navbar',
    Navbar
  )
);
