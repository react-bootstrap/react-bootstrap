import clsx from 'clsx';
import * as React from 'react';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider.js';
import type { Placement, PopperRef } from './types.js';
import { getOverlayDirection } from './helpers.js';
import getInitialPopperStyles from './getInitialPopperStyles.js';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'tooltip'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {Placement | undefined}
   */
  placement?: Placement | undefined;

  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps?: Partial<OverlayArrowProps> | undefined;

  /**
   * @private
   */
  show?: boolean;

  /**
   * @private
   */
  popper?: PopperRef | undefined;

  /**
   * Whether or not Popper has done its initial measurement and positioning.
   *
   * @private
   */
  hasDoneInitialMeasure?: boolean | undefined;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      bsPrefix,
      placement = 'right',
      className,
      style,
      children,
      arrowProps,
      hasDoneInitialMeasure,
      popper,
      show,
      ...props
    }: TooltipProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');
    const isRTL = useIsRTL();

    const [primaryPlacement] = placement?.split('-') || [];
    const bsDirection = getOverlayDirection(primaryPlacement, isRTL);

    let computedStyle = style;
    if (show && !hasDoneInitialMeasure) {
      computedStyle = {
        ...style,
        ...getInitialPopperStyles(popper?.strategy),
      };
    }

    return (
      <div
        ref={ref}
        style={computedStyle}
        role="tooltip"
        x-placement={primaryPlacement}
        className={clsx(className, bsPrefix, `bs-tooltip-${bsDirection}`)}
        {...props}
      >
        <div className="tooltip-arrow" {...arrowProps} />
        <div className={`${bsPrefix}-inner`}>{children}</div>
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Object.assign(Tooltip, {
  // Default tooltip offset.
  // https://github.com/twbs/bootstrap/blob/beca2a6c7f6bc88b6449339fc76edcda832c59e5/js/src/tooltip.js#L65
  TOOLTIP_OFFSET: [0, 6],
});
