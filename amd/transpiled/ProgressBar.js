define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];


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

    __exports__["default"] = ProgressBar;
  });