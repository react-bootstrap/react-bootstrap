/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');
var BootstrapMixin = require('./BootstrapMixin');
var CollapsableMixin = require('./CollapsableMixin');
var domUtils = require('./utils/domUtils');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');


var Nav = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    collapsable: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    navbar: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  getCollapsableDOMNode: function () {
    return this.getDOMNode();
  },

  getCollapsableDimensionValue: function () {
    var node = this.refs.ul.getDOMNode(),
        height = node.offsetHeight,
        computedStyles = domUtils.getComputedStyles(node);

    return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
  },

  render: function () {
    var classes = this.props.collapsable ? this.getCollapsableClassSet() : {};

    classes['navbar-collapse'] = this.props.collapsable;

    if (this.props.navbar && !this.props.collapsable) {
      return this.transferPropsTo(this.renderUl());
    }

    return (
      <nav {...this.props} className={React.addons.classSet(classes)}>
        {this.renderUl()}
      </nav>
    );
  },

  renderUl: function () {
    var classes = this.getBsClassSet();
    var {stacked, justified, navbar, pullRight, className, ...other} = this.props;

    classes['nav-stacked'] = stacked;
    classes['nav-justified'] = justified;
    classes['navbar-nav'] = navbar;
    classes['pull-right'] = pullRight;

    return (
      <ul {...other} className={joinClasses(className, cx(classes))} ref="ul">
        {ValidComponentChildren.map(this.props.children, this.renderNavItem)}
      </ul>
    );
  },

  getChildActiveProp: function (child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.navKey === this.props.activeKey) {
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

  renderNavItem: function (child) {
    return React.addons.cloneWithProps(
      child,
      {
        active: this.getChildActiveProp(child),
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.ref,
        key: child.key,
        navItem: true
      }
    );
  }
});

module.exports = Nav;
