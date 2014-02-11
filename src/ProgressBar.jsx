/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';


var ProgressBar = React.createClass({
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
            <div className={classSet(this.getBsClassSet())} role="progressbar"
                style={{width: width + '%'}}
                ariaValuenow={this.props.now}
                ariaValuemin={this.props.min}
                ariaValuemax={this.props.max}>
                    <span className="sr-only">
                        {this.textForScreenReader()}
                    </span>
            </div>
        );
    },

    textForScreenReader: function() {
        if (!this.props.text)
            return '';
        var formatted = this.props.text.replace('%d%', this.props.now);
        return formatted + ' (' + this.props.bsStyle + ')';
    }
});

export default = ProgressBar;
