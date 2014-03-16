define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var utils = __dependency4__["default"];


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

      getChildActiveProp: function (child) {
        if (child.props.active) {
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

        return child.props.active;
      },

      renderNavItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            active: this.getChildActiveProp(child),
            activeKey: this.props.activeKey,
            activeHref: this.props.activeHref,
            onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
            ref: child.props.ref,
            key: child.props.key
          }
        );
      }
    });

    __exports__["default"] = Nav;
  });