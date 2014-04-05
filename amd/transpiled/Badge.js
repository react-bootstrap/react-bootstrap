define(
  ["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var Badge = React.createClass({displayName: 'Badge',

      render: function () {
        return this.transferPropsTo(
          React.DOM.span( {className:"badge"}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Badge;
  });