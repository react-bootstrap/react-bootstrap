define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];


    var Alert = React.createClass({displayName: 'Alert',
      mixins: [BootstrapMixin],

      propTypes: {
        onDismiss: React.PropTypes.func,
        dismissAfter: React.PropTypes.number
      },

      getDefaultProps: function () {
        return {
          bsClass: 'alert',
          bsStyle: 'info'
        };
      },

      renderDismissButton: function () {
        return (
          React.DOM.button(
            {type:"button",
            className:"close",
            onClick:this.props.onDismiss,
            'aria-hidden':"true"}, 
            " × "
          )
        );
      },

      render: function () {
        var classes = this.getBsClassSet();
        var isDismissable = !!this.props.onDismiss;

        classes['alert-dismissable'] = isDismissable;

        return this.transferPropsTo(
          React.DOM.div( {className:classSet(classes)}, 
            isDismissable ? this.renderDismissButton() : null,
            this.props.children
          )
        );
      },

      componentDidMount: function() {
        if (this.props.dismissAfter && this.props.onDismiss) {
          this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
        }
      },

      componentWillUnmount: function() {
        clearTimeout(this.dismissTimer);
      }
    });

    __exports__["default"] = Alert;
  });