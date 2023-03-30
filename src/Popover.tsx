import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';
import { Placement, PopperRef } from './types';
import { BsPrefixProps, getOverlayDirection } from './helpers';
import getInitialPopperStyles from './getInitialPopperStyles';

export interface PopoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  placement?: Placement;
  title?: string;
  arrowProps?: Partial<OverlayArrowProps>;
  body?: boolean;
  popper?: PopperRef;
  show?: boolean;
  hasDoneInitialMeasure?: boolean;
}

const propTypes = {
  /**
   * @default 'popover'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: PropTypes.string,

  /**
   * Sets the direction the Popover is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  placement: PropTypes.oneOf<Placement>([
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
   * An Overlay injected set of props for positioning the popover arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),

  /**
   * When this prop is set, it creates a Popover with a Popover.Body inside
   * passing the children directly to it
   */
  body: PropTypes.bool,

  /**
   * Whether or not Popper has done its initial measurement and positioning.
   */
  hasDoneInitialMeasure: PropTypes.bool,

  /** @private */
  popper: PropTypes.object,

  /** @private */
  show: PropTypes.bool,
};

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

Popover.propTypes = propTypes as any;

export default Object.assign(Popover, {
  Header: PopoverHeader,
  Body: PopoverBody,

  // Default popover offset.
  // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
  POPPER_OFFSET: [0, 8] as const,
});
