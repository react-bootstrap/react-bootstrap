import classNames from 'classnames';
import React, { cloneElement, PropTypes } from 'react';

import { State } from './styleMaps';
import {
  bsStyles, bsClass, getClassSet, prefix,
} from './utils/bootstrapUtils';
import deprecationWarning from './utils/deprecationWarning';
import ValidComponentChildren from './utils/ValidComponentChildren';

import Interpolate from './Interpolate';

/**
 * Custom propTypes checker
 */
function onlyProgressBar(props, propName, componentName) {
  if (props[propName]) {
    let error, childIdentifier;

    React.Children.forEach(props[propName], (child) => {
      if (child.type !== ProgressBar) { //eslint-disable-line
        childIdentifier = (child.type.displayName ? child.type.displayName : child.type);
        error = new Error(`Children of ${componentName} can contain only ProgressBar components. Found ${childIdentifier}`);
      }
    });

    return error;
  }
}

class ProgressBar extends React.Component {

  getPercentage(now, min, max) {
    const roundPrecision = 1000;
    return Math.round(((now - min) / (max - min) * 100) * roundPrecision) / roundPrecision;
  }

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
  }

  renderChildBar(child, index) {
    return cloneElement(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  }

  renderProgressBar() {
    let { className, label, now, min, max, style, ...props } = this.props;

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

    const classes = classNames(className, getClassSet(this.props), {
      active: this.props.active,
      [prefix(this.props, 'striped')]: this.props.active || this.props.striped
    });

    return (
      <div
        {...props}
        className={classes}
        role="progressbar"
        style={{ width: percentage + '%', ...style }}
        aria-valuenow={this.props.now}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}
      >
        {label}
      </div>
    );
  }

  renderLabel(percentage) {
    const { interpolateClass, now, min, max, bsStyle, label } = this.props;
    const InterpolateClass = interpolateClass || Interpolate;

    const { REGEXP } = InterpolateClass;
    if (REGEXP && REGEXP.exec(label)) {
      deprecationWarning(
        'String interpolation in <ProgressBar label>',
        'ES2015 template strings or other patterns'
      );
    }

    return (
      <InterpolateClass
        now={now}
        min={min}
        max={max}
        percent={percentage}
        bsStyle={bsStyle}
      >
        {label}
      </InterpolateClass>
    );
  }
}

ProgressBar.propTypes = {
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
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

export default bsStyles(State.values(),
  bsClass('progress-bar',
    ProgressBar
  )
);
