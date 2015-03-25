import React, { cloneElement } from 'react';
import Interpolate from './Interpolate';
import BootstrapMixin from './BootstrapMixin';
import classSet from 'classnames';

import ValidComponentChildren from './utils/ValidComponentChildren';

const ProgressBar = React.createClass({
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

  getDefaultProps() {
    return {
      bsClass: 'progress-bar',
      min: 0,
      max: 100
    };
  },

  getPercentage(now, min, max) {
    return Math.ceil((now - min) / (max - min) * 100);
  },

  render() {
    let classes = {
        progress: true
      };

    if (this.props.active) {
      classes['progress-striped'] = true;
      classes.active = true;
    } else if (this.props.striped) {
      classes['progress-striped'] = true;
    }

    if (!ValidComponentChildren.hasValidComponent(this.props.children)) {
      if (!this.props.isChild) {
        return (
          <div {...this.props} className={classSet(this.props.className, classes)}>
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
        <div {...this.props} className={classSet(this.props.className, classes)}>
          {ValidComponentChildren.map(this.props.children, this.renderChildBar)}
        </div>
      );
    }
  },

  renderChildBar(child, index) {
    return cloneElement(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  },

  renderProgressBar() {
    let percentage = this.getPercentage(
        this.props.now,
        this.props.min,
        this.props.max
      );

    let label;

    if (typeof this.props.label === 'string') {
      label = this.renderLabel(percentage);
    } else if (this.props.label) {
      label = this.props.label;
    }

    if (this.props.srOnly) {
      label = this.renderScreenReaderOnlyLabel(label);
    }

    let classes = this.getBsClassSet();

    return (
      <div {...this.props} className={classSet(this.props.className, classes)} role="progressbar"
        style={{width: percentage + '%'}}
        aria-valuenow={this.props.now}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}>
        {label}
      </div>
    );
  },

  renderLabel(percentage) {
    let InterpolateClass = this.props.interpolateClass || Interpolate;

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

  renderScreenReaderOnlyLabel(label) {
    return (
      <span className="sr-only">
        {label}
      </span>
    );
  }
});

export default ProgressBar;
