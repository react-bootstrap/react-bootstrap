/** @jsx React.DOM */

var React = require('react');
var Interpolate = require('./Interpolate');
var BootstrapMixin = require('./BootstrapMixin');
var ValidComponentChildren = require('./utils/ValidComponentChildren');


var ProgressBar = React.createClass({
  propTypes: {
    min: React.PropTypes.number,
    now: React.PropTypes.number,
    max: React.PropTypes.number,
    label: React.PropTypes.node,
    srOnly: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    active: React.PropTypes.bool
  },

  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'progress-bar',
      min: 0,
      max: 100,
      interpolateClass: Interpolate
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

    if (!ValidComponentChildren.hasValidComponent(this.props.children)) {
      if (!this.props.isChild) {
        return (
          <div {...this.props} className={React.addons.classSet(classes)}>
            {this.renderProgressBar()}
          </div>
        );
      } else {
        return this.renderProgressBar();
      }
    } else {
      return (
        <div {...this.props} className={React.addons.classSet(classes)}>
          {React.Children.map(this.props.children, this.renderChildBar)}
        </div>
      );
    }
  },

  renderChildBar: function (child) {
    return React.addons.cloneWithProps(child, {
      isChild: true,
      key: child.key,
      ref: child.ref
    });
  },

  renderProgressBar: function () {
    var percentage = this.getPercentage(
        this.props.now,
        this.props.min,
        this.props.max
      );

    var label;

    if (typeof this.props.label === "string") {
      label = this.renderLabel(percentage);
    } else if (this.props.label) {
      label = this.props.label;
    }

    if (this.props.srOnly) {
      label = this.renderScreenReaderOnlyLabel(label);
    }

    return (
      <div className={React.addons.classSet(this.getBsClassSet())} role="progressbar"
        style={{width: percentage + '%'}}
        aria-valuenow={this.props.now}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}>
        {label}
      </div>
    );
  },

  renderLabel: function (percentage) {
    return (
      <this.props.interpolateClass
        now={this.props.now}
        min={this.props.min}
        max={this.props.max}
        percent={percentage}
        bsStyle={this.props.bsStyle}
        format={this.props.label} />
    );
  },

  renderScreenReaderOnlyLabel: function (label) {
    return (
      <span className="sr-only">
        {label}
      </span>
    );
  }
});

module.exports = ProgressBar;
