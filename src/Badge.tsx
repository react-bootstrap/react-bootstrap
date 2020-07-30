import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Color } from './types';

export interface BadgeProps extends BsPrefixProps {
  bg?: string;
  pill?: boolean;
  text?: Color;
}

type Badge = BsPrefixRefForwardingComponent<'span', BadgeProps>;

const propTypes = {
  /** @default 'badge' */
  bsPrefix: PropTypes.string,

  /**
   * A convenience prop for adding `bg-*` utility classes since they are so commonly used here.
   * `light` and `dark` are common choices but any `bg-*` class is supported, including any custom ones you might define.
   *
   * Pairs nicely with the `variant` prop.
   */
  bg: PropTypes.string,

  /**
   * Add the `pill` modifier to make badges more rounded with
   * some additional horizontal padding
   */
  pill: PropTypes.bool.isRequired,
  /**
   * Sets badge text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  text: PropTypes.string,
  /** @default span */
  as: PropTypes.elementType,
};

const defaultProps = {
  pill: false,
};

const Badge: Badge = React.forwardRef(
  (
    {
      bsPrefix,
      bg,
      pill,
      text,
      className,
      as: Component = 'span',
      ...props
    }: BadgeProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'badge');
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          prefix,
          pill && `rounded-pill`,
          text && `text-${text}`,
          bg && `bg-${bg}`,
        )}
      />
    );
  },
);

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
