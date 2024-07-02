import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { useBootstrapPrefix } from './ThemeProvider';

import { ArrowProps, Placement } from './Overlay';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixPropsWithChildren {
  id: string;
  placement?: Placement;
  arrowProps?: ArrowProps;
  show?: boolean;
  popper?: any;
}

type Tooltip = BsPrefixRefForwardingComponent<'div', TooltipProps>;

const propTypes = {
  /**
   * @default 'tooltip'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),

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

  /** @private */
  popper: PropTypes.object,

  /** @private */
  show: PropTypes.any,
};

const Tooltip: Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      bsPrefix,
      placement = 'right',
      className,
      style,
      children,
      arrowProps,
      popper: _,
      show: _2,
      ...props
    }: TooltipProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');

    const [primaryPlacement] = placement?.split('-') || [];

    return (
      <div
        ref={ref}
        style={style}
        role="tooltip"
        x-placement={primaryPlacement}
        className={classNames(
          className,
          bsPrefix,
          `bs-tooltip-${primaryPlacement}`,
        )}
        {...props}
      >
        <div className="arrow" {...arrowProps} />
        <div className={`${bsPrefix}-inner`}>{children}</div>
      </div>
    );
  },
);

Tooltip.propTypes = propTypes;
Tooltip.displayName = 'Tooltip';

export default Tooltip;
