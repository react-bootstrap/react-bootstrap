import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { useBootstrapPrefix } from './ThemeProvider';
import PopoverTitle from './PopoverTitle';
import PopoverContent from './PopoverContent';
import { ArrowProps, Placement } from './Overlay';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface PopoverProps
  extends React.ComponentPropsWithoutRef<'div'>,
    BsPrefixPropsWithChildren {
  id: string;
  placement?: Placement;
  title?: string;
  arrowProps?: ArrowProps;
  content?: boolean;
  popper?: any;
  show?: boolean;
}

type Popover = BsPrefixRefForwardingComponent<'div', PopoverProps> & {
  Title: typeof PopoverTitle;
  Content: typeof PopoverContent;
};

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
  placement: PropTypes.oneOf(['auto', 'top', 'bottom', 'left', 'right']),

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

const defaultProps = {
  placement: 'right',
};

const Popover: Popover = (React.forwardRef<HTMLDivElement, PopoverProps>(
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
    }: PopoverProps,
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
    const [primaryPlacement] = placement?.split('-') || [];

    return (
      <div
        ref={ref}
        role="tooltip"
        style={style}
        x-placement={primaryPlacement}
        className={classNames(
          className,
          decoratedBsPrefix,
          primaryPlacement && `bs-popover-${primaryPlacement}`,
        )}
        {...props}
      >
        <div className="arrow" {...arrowProps} />
        {content ? <PopoverContent>{children}</PopoverContent> : children}
      </div>
    );
  },
) as unknown) as Popover;

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps as any;

Popover.Title = PopoverTitle;
Popover.Content = PopoverContent;

export default Popover;
