define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];

    var NavItem = React.createClass({displayName: 'NavItem',
      mixins: [BootstrapMixin],

      propTypes: {
        onSelect: React.PropTypes.func,
        isActive: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        title: React.PropTypes.string
      },

      getDefaultProps: function () {
        return {
          href: '#'
        };
      },

      render: function () {
        var classes = {
          'active': this.props.isActive,
          'disabled': this.props.disabled
        };

        return this.transferPropsTo(
          React.DOM.li( {className:classSet(classes)}, 
            React.DOM.a(
              {href:this.props.href,
              title:this.props.title,
              onClick:this.handleClick}, 
              this.props.children
            )
          )
        );
      },

      handleClick: function (e) {
        if (this.props.onSelect) {
          e.preventDefault();

          if (!this.props.disabled) {
            this.props.onSelect(this.props.key);
          }
        }
      }
    });

    __exports__["default"] = NavItem;
  });