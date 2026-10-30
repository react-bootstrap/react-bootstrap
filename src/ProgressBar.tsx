import clsx from 'clsx';
import * as React from 'react';
import { cloneElement } from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';
import { map } from './ElementChildren.js';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'progress'
   */
  bsPrefix?: string | undefined;

  /**
   * Minimum value progress can begin from
   */
  min?: number | undefined;

  /**
   * Current value of progress
   */
  now?: number | undefined;

  /**
   * Maximum value progress can reach
   */
  max?: number | undefined;

  /**
   * Show label that represents visual percentage.
   * EG. 60%
   */
  label?: React.ReactNode | undefined;

  /**
   * Hide's the label visually.
   */
  visuallyHidden?: boolean | undefined;

  /**
   * Uses a gradient to create a striped effect.
   */
  striped?: boolean | undefined;

  /**
   * Animate's the stripes from right to left
   */
  animated?: boolean | undefined;

  /**
   * Sets the background class of the progress bar.
   *
   * @type {'success' | 'danger' | 'warning' | 'info' | string | undefined}
   */
  variant?: 'success' | 'danger' | 'warning' | 'info' | string | undefined;

  /**
   * @private
   * @internal
   */
  isChild?: boolean | undefined;
}

const ROUND_PRECISION = 1000;

function getPercentage(now: number, min: number, max: number) {
  const percentage = ((now - min) / (max - min)) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      bsPrefix,
      isChild = false,
      children,
      min = 0,
      now = 0,
      max = 100,
      label,
      animated = false,
      visuallyHidden = false,
      striped = false,
      variant,
      className,
      style,
      ...props
    }: ProgressBarProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'progress');

    if (children) {
      return (
        <div
          ref={ref}
          {...props}
          style={style}
          className={clsx(className, `${bsPrefix}-stacked`)}
        >
          {map(children, (child) => cloneElement(child, { isChild: true }))}
        </div>
      );
    }

    const width = `${getPercentage(now, min, max)}%`;

    return (
      <div
        ref={ref}
        {...props}
        role="progressbar"
        className={clsx(className, bsPrefix)}
        style={{ width: isChild ? width : undefined, ...style }}
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        <div
          className={clsx(className, `${bsPrefix}-bar`, {
            [`bg-${variant}`]: variant,
            [`${bsPrefix}-bar-animated`]: animated,
            [`${bsPrefix}-bar-striped`]: animated || striped,
          })}
          style={
            // Stacked progress bar width style is on the parent.
            isChild ? undefined : { width }
          }
        >
          {visuallyHidden ? (
            <span className="visually-hidden">{label}</span>
          ) : (
            label
          )}
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
