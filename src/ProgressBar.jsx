/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import Interpolate    from './Interpolate';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';


var ProgressBar = React.createClass({
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
          <div className={classSet(classes)}>
            {this.renderProgressBar()}
          </div>
        );
      } else {
        return this.transferPropsTo(
          this.renderProgressBar()
        );
      }
    } else {
      return this.transferPropsTo(
        <div className={classSet(classes)}>
          {utils.modifyChildren(this.props.children, this.renderChildBar)}
        </div>
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
      <div className={classSet(this.getBsClassSet())} role="progressbar"
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

  renderScreenReaderOnlyLabel: function (percentage) {
    return (
      <span className="sr-only">
        {this.renderLabel(percentage)}
      </span>
    );
  }
});

export default ProgressBar;
