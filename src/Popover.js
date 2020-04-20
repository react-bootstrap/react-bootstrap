import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { useBootstrapPrefix } from './ThemeProvider';
import PopoverTitle from './PopoverTitle';
import PopoverContent from './PopoverContent';

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

const Popover = React.forwardRef(
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
    return (
      <div
        ref={ref}
        role="tooltip"
        style={style}
        x-placement={placement}
        className={classNames(
          className,
          decoratedBsPrefix,
          `bs-popover-${placement}`,
        )}
        {...props}
      >
        <div
          className="arrow"
          {...arrowProps}
          // this prevents an error if you render a Popover without arrow props, like in a test
          style={arrowProps ? { ...arrowProps.style, margin: 0 } : undefined}
        />
        {content ? <PopoverContent>{children}</PopoverContent> : children}
      </div>
    );
  },
);

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

Popover.Title = PopoverTitle;
Popover.Content = PopoverContent;

export default Popover;
