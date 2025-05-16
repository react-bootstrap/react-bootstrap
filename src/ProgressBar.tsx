import classNames from 'classnames';
import * as React from 'react';
import { cloneElement } from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import { map } from './ElementChildren';

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
   */
  isChild?: boolean | undefined;
}

const ROUND_PRECISION = 1000;

function getPercentage(now, min, max) {
  const percentage = ((now - min) / (max - min)) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

function renderProgressBar(
  {
    min,
    now,
    max,
    label,
    visuallyHidden,
    striped,
    animated,
    className,
    style,
    variant,
    bsPrefix,
    ...props
  }: ProgressBarProps,
  ref,
) {
  return (
    <div
      ref={ref}
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
      {visuallyHidden ? (
        <span className="visually-hidden">{label}</span>
      ) : (
        label
      )}
    </div>
  );
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ isChild = false, ...rest }: ProgressBarProps, ref) => {
    const props = {
      min: 0,
      max: 100,
      animated: false,
      visuallyHidden: false,
      striped: false,
      ...rest,
    };

    props.bsPrefix = useBootstrapPrefix(props.bsPrefix, 'progress');

    if (isChild) {
      return renderProgressBar(props, ref);
    }

    const {
      min,
      now,
      max,
      label,
      visuallyHidden,
      striped,
      animated,
      bsPrefix,
      variant,
      className,
      children,
      ...wrapperProps
    } = props;

    return (
      <div
        ref={ref}
        {...wrapperProps}
        className={classNames(className, bsPrefix)}
      >
        {children
          ? map(children, (child) => cloneElement(child, { isChild: true }))
          : renderProgressBar(
              {
                min,
                now,
                max,
                label,
                visuallyHidden,
                striped,
                animated,
                bsPrefix,
                variant,
              },
              ref,
            )}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
