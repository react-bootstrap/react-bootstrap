import clsx from 'clsx';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';

export type AspectRatio = '1x1' | '4x3' | '16x9' | '21x9' | string;

export interface RatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'ratio'
   */
  bsPrefix?: string | undefined;

  /**
   * This component requires a single child element
   */
  children: React.ReactElement | string | number;

  /**
   * Set the aspect ratio of the embed. A fraction or a percentage can also
   * be used to create custom aspect ratios.
   */
  aspectRatio?: AspectRatio | number | undefined;
}

function toPercent(num: number): string {
  if (num <= 0) return '100%';
  if (num < 1) return `${num * 100}%`;
  return `${num}%`;
}

const Ratio = React.forwardRef<HTMLDivElement, RatioProps>(
  (
    { bsPrefix, className, children, aspectRatio = '1x1', style, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'ratio');
    const isCustomRatio = typeof aspectRatio === 'number';

    return (
      <div
        ref={ref}
        {...props}
        style={{
          ...style,
          ...(isCustomRatio && {
            '--bs-aspect-ratio': toPercent(aspectRatio as number),
          }),
        }}
        className={clsx(
          bsPrefix,
          className,
          !isCustomRatio && `${bsPrefix}-${aspectRatio}`,
        )}
      >
        {React.Children.only(children)}
      </div>
    );
  },
);

Ratio.displayName = 'Ratio';

export default Ratio;
