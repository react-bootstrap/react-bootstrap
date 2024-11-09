import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider';
import { Placement, PopperRef } from './types';
import { BsPrefixProps, getOverlayDirection } from './helpers';
import getInitialPopperStyles from './getInitialPopperStyles';

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  placement?: Placement;
  arrowProps?: Partial<OverlayArrowProps>;
  show?: boolean;
  popper?: PopperRef;
  hasDoneInitialMeasure?: boolean;
}

const propTypes = {
  /**
   * @default 'tooltip'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: PropTypes.string,

  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),

  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),

  /**
   * Whether or not Popper has done its initial measurement and positioning.
   */
  hasDoneInitialMeasure: PropTypes.bool,

  /** @private */
  popper: PropTypes.object,

  /** @private */
  show: PropTypes.any,
};

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
        className={classNames(className, bsPrefix, `bs-tooltip-${bsDirection}`)}
        {...props}
      >
        <div className="tooltip-arrow" {...arrowProps} />
        <div className={`${bsPrefix}-inner`}>{children}</div>
      </div>
    );
  },
);

Tooltip.propTypes = propTypes as any;
Tooltip.displayName = 'Tooltip';

export default Object.assign(Tooltip, {
  // Default tooltip offset.
  // https://github.com/twbs/bootstrap/blob/beca2a6c7f6bc88b6449339fc76edcda832c59e5/js/src/tooltip.js#L65
  TOOLTIP_OFFSET: [0, 6],
});
