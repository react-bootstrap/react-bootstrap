import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { useBootstrapPrefix } from './ThemeProvider';
import PopoverTitle from './PopoverTitle';
import PopoverContent from './PopoverContent';
import { ArrowProps, Placement } from './Overlay';
import { BsPrefixProps } from './helpers';

export interface PopoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {
  id: string;
  placement?: Placement;
  title?: string;
  arrowProps?: ArrowProps;
  content?: boolean;
  popper?: any;
  show?: boolean;
}

const propTypes = {
  /**
   * @default 'popover'
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
   * When this prop is set, it creates a Popover with a Popover.Content inside
   * passing the children directly to it
   */
  content: PropTypes.bool,

  /** @private */
  popper: PropTypes.object,

  /** @private */
  show: PropTypes.bool,
};

const defaultProps: Partial<PopoverProps> = {
  placement: 'right',
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      bsPrefix,
      placement,
      className,
      style,
      children,
      content,
      arrowProps,
      popper: _,
      show: _1,
      ...props
    },
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
    const [primaryPlacement] = placement?.split('-') || [];
    let bsDirection = primaryPlacement;
    if (primaryPlacement === 'left') {
      bsDirection = 'start';
    } else if (primaryPlacement === 'right') {
      bsDirection = 'end';
    }

    return (
      <div
        ref={ref}
        role="tooltip"
        style={style}
        x-placement={primaryPlacement}
        className={classNames(
          className,
          decoratedBsPrefix,
          primaryPlacement && `bs-popover-${bsDirection}`,
        )}
        {...props}
      >
        <div className="popover-arrow" {...arrowProps} />
        {content ? <PopoverContent>{children}</PopoverContent> : children}
      </div>
    );
  },
);

Popover.propTypes = propTypes as any;
Popover.defaultProps = defaultProps;

export default Object.assign(Popover, {
  Title: PopoverTitle,
  Content: PopoverContent,
});
