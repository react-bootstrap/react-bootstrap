import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import BootstrapMixin from './BootstrapMixin';
import Grid from './Grid';
import NavBrand from './NavBrand';

import createChainedFunction from './utils/createChainedFunction';
import deprecationWarning from './utils/deprecationWarning';
import ValidComponentChildren from './utils/ValidComponentChildren';

const Navbar = React.createClass({
  mixins: [BootstrapMixin],

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

  componentWillMount() {
    // TODO: Use the `deprecated` PropType once we're on React 0.14.
    if (this.props.brand) {
      deprecationWarning('Navbar brand attribute', 'NavBrand Component');
    }
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

    const classes = this.getBsClassSet();
    classes['navbar-fixed-top'] = fixedTop;
    classes['navbar-fixed-bottom'] = fixedBottom;
    classes['navbar-static-top'] = staticTop;
    classes['navbar-inverse'] = inverse;

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
    const hasToggle =
      this.props.toggleButton || this.props.toggleNavKey != null;

    return (
      <div className="navbar-header">
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

    if (React.isValidElement(toggleButton)) {
      return React.cloneElement(toggleButton, {
        className: classNames(toggleButton.props.className, 'navbar-toggle'),
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
        className="navbar-toggle"
      >
        {children}
      </button>
    );
  }

});

export default Navbar;
