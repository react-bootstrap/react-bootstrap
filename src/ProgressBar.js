import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

import ValidComponentChildren from './utils/ValidComponentChildren';

const ROUND_PRECISION = 1000;

/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */
function onlyProgressBar(props, propName, componentName) {
  const children = props[propName];
  if (!children) {
    return null;
  }

  let error = null;

  React.Children.forEach(children, child => {
    if (error) {
      return;
    }

    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */
    const element = <DecoratedProgressBar />;
    if (child.type === element.type) return;

    const childIdentifier = React.isValidElement(child)
      ? child.type.displayName || child.type.name || child.type
      : child;
    error = new Error(
      `Children of ${componentName} can contain only ProgressBar ` +
        `components. Found ${childIdentifier}.`
    );
  });

  return error;
}

const propTypes = {
  min: PropTypes.number,
  now: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.node,
  srOnly: PropTypes.bool,
  striped: PropTypes.bool,
  animated: PropTypes.bool,
  bsPrefix: PropTypes.string,
  /**
   * Sets the background class of the progress bar.
   *
   * @type ('success'|'danger'|'warning'|'info')
   */
  variant: PropTypes.string,
  children: onlyProgressBar,

  /**
   * @private
   */
  isChild: PropTypes.bool
};

const defaultProps = {
  min: 0,
  max: 100,
  animated: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

class ProgressBar extends React.Component {
  renderProgressBar({
    min,
    now,
    max,
    label,
    srOnly,
    striped,
    animated,
    className,
    style,
    variant,
    bsPrefix,
    ...props
  }) {
    const classes = {
      [bsPrefix]: true,
      [`bg-${variant}`]: variant,
      [`${bsPrefix}-animated`]: animated,
      [`${bsPrefix}-striped`]: animated || striped
    };
    return (
      <div
        {...props}
        role="progressbar"
        className={classNames(className, classes)}
        style={{ width: `${getPercentage(now, min, max)}%`, ...style }}
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {srOnly ? <span className="sr-only">{label}</span> : label}
      </div>
    );
  }

  render() {
    const {  isChild, ...props } = this.props;

    if (isChild) {
      return this.renderProgressBar(props);
    }

    const {
      min,
      now,
      max,
      label,
      srOnly,
      striped,
      animated,
      bsPrefix,
      variant,
      className,
      children,
      ...wrapperProps
    } = props;

    return (
      <div {...wrapperProps} className={classNames(className, 'progress')}>
        {children
          ? ValidComponentChildren.map(children, child =>
              cloneElement(child, { isChild: true })
            )
          : this.renderProgressBar({
              min,
              now,
              max,
              label,
              srOnly,
              striped,
              animated,
              bsPrefix,
              variant
            })}
      </div>
    );
  }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;
const DecoratedProgressBar = createBootstrapComponent (ProgressBar, 'progress-bar');

export default DecoratedProgressBar;

