/** @jsx React.DOM */

import React               from './react-es6';
import cloneWithProps      from './react-es6/lib/cloneWithProps';
import OverlayTriggerMixin from './OverlayTriggerMixin';

var OverlayTrigger = React.createClass({
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
            return <span />;
        }

        return cloneWithProps(
            this.props.overlay,
            {onRequestHide: this.hide}
        );
    },

    render: function() {
        return (this.props.children) ?
            this.renderTrigger() : <span />;
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

export default = OverlayTrigger;
