var ProgressBar = React.createClass({
    propTypes: {
        min: React.PropTypes.number.isRequired,
        now: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        text: React.PropTypes.string
    },

    mixins: [BootStrapMixin],

    getDefaultProps: function() {return {bsClass: 'progress-bar'};},

    render: function() {
        var width = (this.props.now / this.props.max) * 100;
        return this.transferPropsTo(
            <div className={this.extendClassName()} role="progressbar"
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
        var formatted = this.props.txt.replace('%d%', this.props.now);
        return formatted + ' (' + this.props.bsStyle + ')');
    }
});
