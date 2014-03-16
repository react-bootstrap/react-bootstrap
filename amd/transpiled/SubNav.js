define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var utils = __dependency4__["default"];


    var SubNav = React.createClass({displayName: 'SubNav',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        title: React.PropTypes.string,
        text: React.PropTypes.renderable,
      },

      getDefaultProps: function () {
        return {
          bsClass: 'nav'
        };
      },

      handleClick: function (e) {
        if (this.props.onSelect) {
          e.preventDefault();

          if (!this.props.disabled) {
            this.props.onSelect(this.props.key, this.props.href);
          }
        }
      },

      isActive: function () {
        return this.isChildActive(this);
      },

      isChildActive: function (child) {
        var isActive = false;

        if (child.props.active) {
          return true;
        }

        if (this.props.activeKey != null && this.props.activeKey === child.props.key) {
          return true;
        }

        if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
          return true;
        }

        if (child.props.children) {
          React.Children.forEach(
            child.props.children,
            function (child) {
              if (this.isChildActive(child)) {
                isActive = true;
              }
            },
            this
          );

          return isActive;
        }

        return false;
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

      render: function () {
        var classes = {
          'active': this.isActive(),
          'disabled': this.props.disabled
        };

        return this.transferPropsTo(
          React.DOM.li( {className:classSet(classes)}, 
            React.DOM.a(
              {href:this.props.href,
              title:this.props.title,
              onClick:this.handleClick,
              ref:"anchor"}, 
              this.props.text
            ),
            React.DOM.ul( {className:"nav"}, 
              utils.modifyChildren(this.props.children, this.renderNavItem)
            )
          )
        );
      },

      renderNavItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            active: this.getChildActiveProp(child),
            onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
            ref: child.props.ref,
            key: child.props.key
          }
        );
      }
    });

    __exports__["default"] = SubNav;
  });