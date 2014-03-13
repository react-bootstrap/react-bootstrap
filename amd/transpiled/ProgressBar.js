define(
  ["./react-es6","./react-es6/lib/cx","./Interpolate","./BootstrapMixin","./utils","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var Interpolate = __dependency3__["default"];
    var BootstrapMixin = __dependency4__["default"];
    var utils = __dependency5__["default"];


    var ProgressBar = React.createClass({displayName: 'ProgressBar',
      propTypes: {
        min: React.PropTypes.number,
        now: React.PropTypes.number,
        max: React.PropTypes.number,
        label: React.PropTypes.string,
        srOnly: React.PropTypes.bool,
        striped: React.PropTypes.bool,
        active: React.PropTypes.bool
      },

      mixins: [BootstrapMixin],

      getDefaultProps: function () {
        return {
          bsClass: 'progress-bar',
          min: 0,
          max: 100
        };
      },

      getPercentage: function (now, min, max) {
        return Math.ceil((now - min) / (max - min) * 100);
      },

      render: function () {
        var classes = {
            progress: true
          };

        if (this.props.active) {
          classes['progress-striped'] = true;
          classes['active'] = true;
        } else if (this.props.striped) {
          classes['progress-striped'] = true;
        }

        if (!this.props.children) {
          if (!this.props.isChild) {
            return this.transferPropsTo(
              React.DOM.div( {className:classSet(classes)}, 
                this.renderProgressBar()
              )
            );
          } else {
            return this.transferPropsTo(
              this.renderProgressBar()
            );
          }
        } else {
          return this.transferPropsTo(
            React.DOM.div( {className:classSet(classes)}, 
              utils.modifyChildren(this.props.children, this.renderChildBar)
            )
          );
        }
      },

      renderChildBar: function (child) {
        return utils.cloneWithProps(child, {
          isChild: true,
          key: child.props.key,
          ref: child.props.ref
        });
      },

      renderProgressBar: function () {
        var percentage = this.getPercentage(
            this.props.now,
            this.props.min,
            this.props.max
          );

        var label;

        if (this.props.label) {
          label = this.props.srOnly ?
            this.renderScreenReaderOnlyLabel(percentage) : this.renderLabel(percentage);
        }

        return (
          React.DOM.div( {className:classSet(this.getBsClassSet()), role:"progressbar",
            style:{width: percentage + '%'},
            'aria-valuenow':this.props.now,
            'aria-valuemin':this.props.min,
            'aria-valuemax':this.props.max}, 
            label
          )
        );
      },

      renderLabel: function (percentage) {
        var InterpolateClass = this.props.interpolateClass || Interpolate;

        return (
          InterpolateClass(
            {now:this.props.now,
            min:this.props.min,
            max:this.props.max,
            percent:percentage,
            bsStyle:this.props.bsStyle}, 
            this.props.label
          )
        );
      },

      renderScreenReaderOnlyLabel: function (percentage) {
        return (
          React.DOM.span( {className:"sr-only"}, 
            this.renderLabel(percentage)
          )
        );
      }
    });

    __exports__["default"] = ProgressBar;
  });