"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var utils = require("./utils")["default"];


var Nav = React.createClass({displayName: 'Nav',
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']).isRequired,
    bsVariation: React.PropTypes.oneOf(['stacked','justified']),
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return this.transferPropsTo(
      React.DOM.nav(null, 
        React.DOM.ul( {className:classSet(classes)}, 
          utils.modifyChildren(this.props.children, this.renderNavItem)
        )
      )
    );
  },

  renderNavItem: function (child) {
    return utils.cloneWithProps(
        child,
        {
          isActive: this.props.activeKey != null ? child.props.key === this.props.activeKey : null,
          onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect)
        }
      );
  }
});

exports["default"] = Nav;