define(
  ["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var DropdownMenu = React.createClass({displayName: 'DropdownMenu',
      propTypes: {
        right: React.PropTypes.bool
      },

      render: function () {
        var classes = {
            'dropdown-menu': true,
            'dropdown-menu-right': this.props.right
          };

        return this.transferPropsTo(
          React.DOM.ul(
            {className:classSet(classes),
            role:"menu"}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = DropdownMenu;
  });