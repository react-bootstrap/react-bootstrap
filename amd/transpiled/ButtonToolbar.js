define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./Button","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var Button = __dependency4__["default"];

    var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
      mixins: [BootstrapMixin],

      getDefaultProps: function () {
        return {
          bsClass: 'button-toolbar'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();

        return this.transferPropsTo(
          React.DOM.div(
            {role:"toolbar",
            className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = ButtonGroup;
  });