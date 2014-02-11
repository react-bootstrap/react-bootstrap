"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];


var ProgressBar = React.createClass({displayName: 'ProgressBar',
    propTypes: {
        min: React.PropTypes.number.isRequired,
        now: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        text: React.PropTypes.string
    },

    mixins: [BootstrapMixin],

    getDefaultProps: function() {return {bsClass: 'progress-bar', bsStyle: 'default'};},

    render: function() {
        var width = (this.props.now / this.props.max) * 100;
        return this.transferPropsTo(
            React.DOM.div( {className:classSet(this.getBsClassSet()), role:"progressbar",
                style:{width: width + '%'},
                ariaValuenow:this.props.now,
                ariaValuemin:this.props.min,
                ariaValuemax:this.props.max}, 
                    React.DOM.span( {className:"sr-only"}, 
                        this.textForScreenReader()
                    )
            )
        );
    },

    textForScreenReader: function() {
        if (!this.props.text)
            return '';
        var formatted = this.props.text.replace('%d%', this.props.now);
        return formatted + ' (' + this.props.bsStyle + ')';
    }
});

exports["default"] = ProgressBar;