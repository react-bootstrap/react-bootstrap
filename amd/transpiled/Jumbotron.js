define(
  ["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var Jumbotron = React.createClass({displayName: 'Jumbotron',

      render: function () {
        return this.transferPropsTo(
          React.DOM.div( {className:"jumbotron"}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Jumbotron;
  });