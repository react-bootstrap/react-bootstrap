"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var utils = require("./utils")["default"];


var Nav = React.createClass({displayName: 'Nav',
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['nav-stacked'] = this.props.stacked;
    classes['nav-justified'] = this.props.justified;

    return this.transferPropsTo(
      React.DOM.nav(null, 
        React.DOM.ul( {className:classSet(classes)}, 
          utils.modifyChildren(this.props.children, this.renderNavItem)
        )
      )
    );
  },

  isChildActive: function (child) {
    if (child.props.isActive) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.key === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.isActive;
  },

  renderNavItem: function (child) {
    return utils.cloneWithProps(
      child,
      {
        isActive: this.isChildActive(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
        ref: child.props.ref,
        key: child.props.key
      }
    );
  }
});

exports["default"] = Nav;