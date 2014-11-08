var React = require('react');
var joinClasses = require('./utils/joinClasses');
var Interpolate = require('./Interpolate');
var BootstrapMixin = require('./BootstrapMixin');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

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

    if (!ValidComponentChildren.hasValidComponent(this.props.children)) {
      if (!this.props.isChild) {
        return (
          <div {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
            {this.renderProgressBar()}
          </div>
        );
      } else {
        return (
          this.renderProgressBar()
        );
      }
    } else {
      return (
        <div {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
          {ValidComponentChildren.map(this.props.children, this.renderChildBar)}
        </div>
      );
    }
  },

  renderChildBar: function (child, index) {
    return cloneWithProps(child, {
      isChild: true,
      key: child.key ? child.key : index,
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

    var classes = this.getBsClassSet();

    return (
      <div {...this.props} className={joinClasses(this.props.className, classSet(classes))} role="progressbar"
        style={{width: percentage + '%'}}
        aria-valuenow={this.props.now}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}>
        {label}
      </div>
    );
  },

  renderLabel: function (percentage) {
    var InterpolateClass = this.props.interpolateClass || Interpolate;

    return (
      <InterpolateClass
        now={this.props.now}
        min={this.props.min}
        max={this.props.max}
        percent={percentage}
        bsStyle={this.props.bsStyle}>
        {this.props.label}
      </InterpolateClass>
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
