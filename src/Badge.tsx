import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Color, Variant } from './types';

export interface BadgeProps extends BsPrefixProps {
  variant?: Variant;
  pill?: boolean;
  text?: Color;
}

type Badge = BsPrefixRefForwardingComponent<'span', BadgeProps>;

const propTypes = {
  /** @default 'badge' */
  bsPrefix: PropTypes.string,

  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  variant: PropTypes.string,

  /**
   * Add the `pill` modifier to make badges more rounded with
   * some additional horizontal padding
   */
  pill: PropTypes.bool.isRequired,
  /**
   * Sets card text color
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
      variant,
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
          variant && `bg-${variant}`,
        )}
      />
    );
  },
);

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
