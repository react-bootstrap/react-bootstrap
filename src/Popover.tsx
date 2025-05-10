import classNames from 'classnames';
import * as React from 'react';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';
import type { Placement, PopperRef } from './types';
import { getOverlayDirection } from './helpers';
import getInitialPopperStyles from './getInitialPopperStyles';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'popover'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets the direction the Popover is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   *
   * @type {Placement | undefined}
   */
  placement?: Placement | undefined;

  /**
   * An Overlay injected set of props for positioning the popover arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  arrowProps?: Partial<OverlayArrowProps> | undefined;

  /**
   * When this prop is set, it creates a Popover with a Popover.Body inside
   * passing the children directly to it
   */
  body?: boolean | undefined;

  /**
   * @private
   */
  popper?: PopperRef | undefined;

  /**
   * @private
   */
  show?: boolean | undefined;

  /**
   * Whether or not Popper has done its initial measurement and positioning.
   *
   * @private
   */
  hasDoneInitialMeasure?: boolean | undefined;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      bsPrefix,
      placement = 'right',
      className,
      style,
      children,
      body,
      arrowProps,
      hasDoneInitialMeasure,
      popper,
      show,
      ...props
    },
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
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
        role="tooltip"
        style={computedStyle}
        x-placement={primaryPlacement}
        className={classNames(
          className,
          decoratedBsPrefix,
          primaryPlacement && `bs-popover-${bsDirection}`,
        )}
        {...props}
      >
        <div className="popover-arrow" {...arrowProps} />
        {body ? <PopoverBody>{children}</PopoverBody> : children}
      </div>
    );
  },
);

Popover.displayName = 'Popover';

export default Object.assign(Popover, {
  Header: PopoverHeader,
  Body: PopoverBody,

  // Default popover offset.
  // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
  POPPER_OFFSET: [0, 8] as const,
});
