define(
  ["./react-es6","./react-es6/lib/cloneWithProps","./OverlayTriggerMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var cloneWithProps = __dependency2__["default"];
    var OverlayTriggerMixin = __dependency3__["default"];

    var OverlayTrigger = React.createClass({displayName: 'OverlayTrigger',
        mixins: [OverlayTriggerMixin],

        getDefaultProps: function () {
            return {
                trigger: 'click'
            };
        },

        getInitialState: function() {
            return {
                isOverlayShown: false
            };
        },

        show: function () {
            this.setState({
                isOverlayShown: true
            });
        },

        hide: function () {
            this.setState({
                isOverlayShown: false
            });
        },

        toggle: function () {
            this.setState({
                isOverlayShown: !this.state.isOverlayShown
            });
        },

        renderOverlay: function() {
            if (!this.state.isOverlayShown || !this.props.overlay) {
                return React.DOM.span(null );
            }

            return cloneWithProps(
                this.props.overlay,
                {onRequestHide: this.hide}
            );
        },

        render: function() {
            return (this.props.children) ?
                this.renderTrigger() : React.DOM.span(null );
        },

        renderTrigger: function () {
            var props = {},
                trigger = this.props.trigger,
                propName;

            if (trigger !== 'manual') {
                if (trigger === 'hover') {
                    trigger = 'mouseOver';
                }
                propName = 'on' + trigger.substr(0, 1).toUpperCase() +
                    trigger.substr(1);
                props[propName] = this.toggle;
            }

            return React.DOM.span(
                props,
                this.props.children
            );
        }
    });

    __exports__["default"] = OverlayTrigger;
  });