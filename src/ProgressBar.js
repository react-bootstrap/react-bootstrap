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
    children: onlyProgressBar, // eslint-disable-line no-use-before-define
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
      <div
        {...this.props}
        className={classNames(this.props.className, 'progress')}
        min={null}
        max={null}
        label={null}
        aria-valuetext={null}
      >
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
    let { className, label, now, min, max, ...props } = this.props;

    const percentage = this.getPercentage(
      now, min, max
    );

    if (typeof label === 'string') {
      label = this.renderLabel(percentage);
    }

    if (this.props.srOnly) {
      label = (
        <span className="sr-only">
          {label}
        </span>
      );
    }

    const classes = classNames(className, this.getBsClassSet(), {
      active: this.props.active,
      'progress-bar-striped': this.props.active || this.props.striped
    });

    return (
      <div
        {...props}
        className={classes}
        role="progressbar"
        style={{ width: percentage + '%' }}
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
