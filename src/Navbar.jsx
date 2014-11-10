/** @jsx React.DOM */

var React = require('react/addons');
var BootstrapMixin = require('./BootstrapMixin');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');


var Navbar = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    fixedTop: React.PropTypes.bool,
    fixedBottom: React.PropTypes.bool,
    staticTop: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    fluid: React.PropTypes.bool,
    role: React.PropTypes.string,
    componentClass: React.PropTypes.node,
    brand: React.PropTypes.node,
    toggleButton: React.PropTypes.node,
    onToggle: React.PropTypes.func,
    navExpanded: React.PropTypes.bool,
    defaultNavExpanded: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: 'nav'
    };
  },

  getInitialState: function () {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle: function () {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navExpanded: !this.state.navExpanded
    });
  },

  isNavExpanded: function () {
    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return (
      <this.props.componentClass {...this.props} className={React.addons.classSet(classes)}>
        <div className={this.props.fluid ? 'container-fluid' : 'container'}>
          {(this.props.brand || this.props.toggleButton || this.props.toggleNavKey) ? this.renderHeader() : null}
          {ValidComponentChildren.map(this.props.children, this.renderChild)}
        </div>
      </this.props.componentClass>
    );
  },

  renderChild: function (child, index) {
    return React.addons.cloneWithProps(child, {
      navbar: true,
      collapsable: this.props.toggleNavKey != null && this.props.toggleNavKey === child.key,
      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.key && this.isNavExpanded(),
      key: child.key != null ? child.key : index,
      ref: child.ref
    });
  },

  renderHeader: function () {
    var brand;

    if (this.props.brand) {
      brand = React.isValidComponent(this.props.brand) ?
        React.addons.cloneWithProps(this.props.brand, {
          className: 'navbar-brand'
        }) : <span className="navbar-brand">{this.props.brand}</span>;
    }

    return (
      <div className="navbar-header">
        {brand}
        {(this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderToggleButton() : null}
      </div>
    );
  },

  renderToggleButton: function () {
    var children;

    if (React.isValidComponent(this.props.toggleButton)) {
      return React.addons.cloneWithProps(this.props.toggleButton, {
        className: 'navbar-toggle',
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
      <button className="navbar-toggle" type="button" onClick={this.handleToggle}>
        {children}
      </button>
    );
  }
});

module.exports = Navbar;
