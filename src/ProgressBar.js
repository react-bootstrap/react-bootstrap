/* eslint react/prop-types: [2, {ignore: "bsStyle"}] */
/* BootstrapMixin contains `bsStyle` type validation */

import React, { cloneElement, PropTypes } from 'react';
import Interpolate from './Interpolate';
import BootstrapMixin from './BootstrapMixin';
import classNames from 'classnames';

import ValidComponentChildren from './utils/ValidComponentChildren';

const ProgressBar = React.createClass({
  propTypes: {
    min: PropTypes.number,
    now: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.node,
    srOnly: PropTypes.bool,
    striped: PropTypes.bool,
    active: PropTypes.bool,
    children: onlyProgressBar,
    className: React.PropTypes.string,
    interpolateClass: PropTypes.node,
    /**
     * @private
     */
    isChild: PropTypes.bool
  },

  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'progress-bar',
      min: 0,
      max: 100,
      active: false,
      isChild: false,
      srOnly: false,
      striped: false
    };
  },

  getPercentage(now, min, max) {
    const roundPrecision = 1000;
    return Math.round(((now - min) / (max - min) * 100) * roundPrecision) / roundPrecision;
  },

  render() {
    if (this.props.isChild) {
      return this.renderProgressBar();
    }

    let content;

    if (this.props.children) {
      content = ValidComponentChildren.map(this.props.children, this.renderChildBar);
    } else {
      content = this.renderProgressBar();
    }

    return (
      <div {...this.props} className={classNames(this.props.className, 'progress')}>
        {content}
      </div>
    );
  },

  renderChildBar(child, index) {
    return cloneElement(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  },

  renderProgressBar() {
    const percentage = this.getPercentage(
      this.props.now,
      this.props.min,
      this.props.max
    );

    let label;

    if (typeof this.props.label === 'string') {
      label = this.renderLabel(percentage);
    } else {
      label = this.props.label;
    }

    if (this.props.srOnly) {
      label = (
        <span className="sr-only">
          {label}
        </span>
      );
    }

    const classes = classNames(this.props.className, this.getBsClassSet(), {
      active: this.props.active,
      'progress-bar-striped': this.props.active || this.props.striped
    });

    return (
      <div
        {...this.props}
        className={classes}
        role="progressbar"
        style={{width: percentage + '%'}}
        aria-valuenow={this.props.now}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}>
        {label}
      </div>
    );
  },

  renderLabel(percentage) {
    const InterpolateClass = this.props.interpolateClass || Interpolate;

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
  }
});

/**
 * Custom propTypes checker
 */
function onlyProgressBar(props, propName, componentName) {
  if (props[propName]) {
    let error, childIdentifier;

    React.Children.forEach(props[propName], (child) => {
      if (child.type !== ProgressBar) {
        childIdentifier = (child.type.displayName ? child.type.displayName : child.type);
        error = new Error(`Children of ${componentName} can contain only ProgressBar components. Found ${childIdentifier}`);
      }
    });

    return error;
  }
}

export default ProgressBar;
