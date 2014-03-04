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
                isOverlayShown: (this.props.defaultOverlayShown == null) ?
                    false : this.props.defaultOverlayShown
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

        _trigger: function () {
            var propName = 'delay' + (this.state.isOverlayShown ? 'Hide' : 'Show'),
                delay = this.props[propName] || this.props.delay;

            clearTimeout(this._triggerTimeout);
            if (delay) {
                this._triggerTimeout = setTimeout(this.toggle, parseInt(delay, 10));
            } else {
                this.toggle();
            }
        },

        renderOverlay: function() {
            var props;

            if (!this.state.isOverlayShown || !this.props.overlay) {
                return React.DOM.span(null );
            }

            props = {
                onRequestHide: this._trigger
            };

            if (this.props.animation != null) {
                props.animation = this.props.animation;
            }

            return cloneWithProps(
                this.props.overlay,
                props
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
                props[propName] = this._trigger;
            }

            return React.DOM.span(
                props,
                this.props.children
            );
        }
    });

    __exports__["default"] = OverlayTrigger;
  });