import classNames from 'classnames';
import React, { cloneElement, PropTypes } from 'react';

import { State } from './styleMaps';
import { bsStyles, bsClass, getClassSet, prefix }
  from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

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
        style={{ width: `${this.getPercentage(now, min, max)}%`, ...style }}
        aria-valuenow={this.props.now}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}
      >
        {label}
      </div>
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

export default bsStyles(Object.values(State),
  bsClass('progress-bar',
    ProgressBar
  )
);
