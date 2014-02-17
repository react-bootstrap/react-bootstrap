define(
  ["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var Tab = React.createClass({displayName: 'Tab',
      handleClick: function () {
        if (typeof this.props.onSelect === 'function') {
          this.props.onSelect(this.props.id);
        }
      },

      render: function () {
        var classes = {
          'nav': true,
          'nav-tab': true,
          'active': this.props.isActive
        };

        return this.transferPropsTo(
          React.DOM.li( {className:classSet(classes)}, 
            React.DOM.a(
              {ref:"button",
              href:this.props.id ? '#' + this.props.id : null,
              onClick:this.handleClick}, 
              this.props.children
            )
          )
        );
      }
    });

    __exports__["default"] = Tab;
  });