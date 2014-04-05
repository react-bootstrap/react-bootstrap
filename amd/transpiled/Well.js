define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];

    var Well = React.createClass({displayName: 'Well',
      mixins: [BootstrapMixin],

      getDefaultProps: function () {
        return {
          bsClass: 'well'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();

        return this.transferPropsTo(
          React.DOM.div( {className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Well;
  });