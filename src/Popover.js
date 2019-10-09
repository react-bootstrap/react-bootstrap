import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';

import {
  bsClass,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

const propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
    style: PropTypes.object
  }),

  /**
   * Title content
   */
  title: PropTypes.node,

  /** @private */
  scheduleUpdate: PropTypes.func,
  /** @private */
  outOfBoundaries: PropTypes.bool
};

const defaultProps = {
  placement: 'right'
};

const Popover = React.forwardRef(
  (
    {
      placement,
      title,
      className,
      style,
      children,
      content,
      arrowProps,
      scheduleUpdate: _,
      outOfBoundaries: _1,
      ...props
    },
    ref
  ) => {
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [placement]: true
    };

    return (
      <div
        {...elementProps}
        ref={ref}
        role="tooltip"
        style={style}
        x-placement={placement}
        className={classNames(className, classes)}
      >
        <div className="arrow" {...arrowProps} />

        {title && <h3 className={prefix(bsProps, 'title')}>{title}</h3>}

        <div className={prefix(bsProps, 'content')}>{children}</div>
      </div>
    );
  }
);

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;
Popover.displayName = 'Popover';

export default bsClass('popover')(Popover);
