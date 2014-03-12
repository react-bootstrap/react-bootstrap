define(
  ["./react-es6","./react-es6/lib/cx","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var utils = __dependency3__["default"];

    var DropdownMenu = React.createClass({displayName: 'DropdownMenu',
      propTypes: {
        pullRight: React.PropTypes.bool,
        onSelect: React.PropTypes.func
      },

      render: function () {
        var classes = {
            'dropdown-menu': true,
            'dropdown-menu-right': this.props.pullRight
          };

        return this.transferPropsTo(
            React.DOM.ul(
              {className:classSet(classes),
              role:"menu"}, 
              utils.modifyChildren(this.props.children, this.renderMenuItem)
            )
          );
      },

      renderMenuItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            // Capture onSelect events
            onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),

            // Force special props to be transferred
            key: child.props.key,
            ref: child.props.ref
          }
        );
      }
    });

    __exports__["default"] = DropdownMenu;
  });