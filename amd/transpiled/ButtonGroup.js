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

      propTypes: {
        vertical:  React.PropTypes.bool,
        justified: React.PropTypes.bool
      },

      getDefaultProps: function () {
        return {
          bsClass: 'button-group'
        };
      },

      render: function () {
        var classes = this.getBsClassSet();
        classes['btn-group-vertical'] = this.props.vertical;
        classes['btn-group-justified'] = this.props.justified;

        return this.transferPropsTo(
          React.DOM.div(
            {className:classSet(classes)}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = ButtonGroup;
  });