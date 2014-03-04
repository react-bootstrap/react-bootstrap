define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];

    var Button = React.createClass({displayName: 'Button',
      mixins: [BootstrapMixin],

      propTypes: {
        // TODO: Uncompatable with React 0.8.0
        //loadingChildren: React.PropTypes.renderable,
        isLoading:   React.PropTypes.bool,
        isActive:    React.PropTypes.bool,
        isDisabled:    React.PropTypes.bool
      },

      getDefaultProps: function () {
        return {
          bsClass: 'button',
          loadingChildren: 'Loading...'
        };
      },

      renderAnchor: function (children, classes, isDisabled) {
        return this.transferPropsTo(
          React.DOM.a(
            {href:this.props.href,
            className:classSet(classes),
            onClick:this.props.onClick,
            disabled:isDisabled}, 
            children
          )
        );
      },

      renderButton: function (children, classes, isDisabled) {
        return this.transferPropsTo(
          React.DOM.button(
            {type:this.props.type || "button",
            className:classSet(classes),
            onClick:this.props.onClick,
            disabled:isDisabled}, 
            children
          )
        );
      },

      render: function () {
        var isDisabled = !!(this.props.isDisabled || this.props.isLoading);

        var classes = this.getBsClassSet();
        classes['disabled'] = isDisabled;
        classes['active'] = this.props.isActive;

        var children = this.props.isLoading ?
          this.props.loadingChildren : this.props.children;

        var renderFuncName = (this.props.href) ?
          'renderAnchor' : 'renderButton';

        return this[renderFuncName](children, classes, isDisabled);
      }
    });

    __exports__["default"] = Button;
  });