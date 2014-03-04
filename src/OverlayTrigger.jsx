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
            return <span />;
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
            props[propName] = this._trigger;
        }

        return React.DOM.span(
            props,
            this.props.children
        );
    }
});

export default = OverlayTrigger;
