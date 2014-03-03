"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var cloneWithProps = require("./react-es6/lib/cloneWithProps")["default"];
var OverlayTriggerMixin = require("./OverlayTriggerMixin")["default"];

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

exports["default"] = OverlayTrigger;