import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

import { map } from './utils/ElementChildren';

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
        `components. Found ${childIdentifier}.`,
    );
  });

  return error;
}

const propTypes = {
  /**
   * Minimum value progress can begin from
   */
  min: PropTypes.number,

  /**
   * Current value of progress
   */
  now: PropTypes.number,

  /**
   * Maximum value progress can reach
   */
  max: PropTypes.number,

  /**
   * Show label that represents visual percentage.
   * EG. 60%
   */
  label: PropTypes.node,

  /**
   * Hide's the label visually.
   */
  srOnly: PropTypes.bool,

  /**
   * Uses a gradient to create a striped effect.
   */
  striped: PropTypes.bool,

  /**
   * Animate's the stripes from right to left
   */
  animated: PropTypes.bool,

  /**
   * @private
   * @default 'progress-bar'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets the background class of the progress bar.
   *
   * @type ('success'|'danger'|'warning'|'info')
   */
  variant: PropTypes.string,

  /**
   * Child elements (only allows elements of type <ProgressBar />)
   */
  children: onlyProgressBar,

  /**
   * @private
   */
  isChild: PropTypes.bool,
};

const defaultProps = {
  min: 0,
  max: 100,
  animated: false,
  isChild: false,
  srOnly: false,
  striped: false,
};

function getPercentage(now, min, max) {
  const percentage = ((now - min) / (max - min)) * 100;
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
    return (
      <div
        {...props}
        role="progressbar"
        className={classNames(className, `${bsPrefix}-bar`, {
          [`bg-${variant}`]: variant,
          [`${bsPrefix}-bar-animated`]: animated,
          [`${bsPrefix}-bar-striped`]: animated || striped,
        })}
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
    const { isChild, ...props } = this.props;

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
      <div {...wrapperProps} className={classNames(className, bsPrefix)}>
        {children
          ? map(children, child => cloneElement(child, { isChild: true }))
          : this.renderProgressBar({
              min,
              now,
              max,
              label,
              srOnly,
              striped,
              animated,
              bsPrefix,
              variant,
            })}
      </div>
    );
  }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;
const DecoratedProgressBar = createBootstrapComponent(ProgressBar, 'progress');

export default DecoratedProgressBar;
