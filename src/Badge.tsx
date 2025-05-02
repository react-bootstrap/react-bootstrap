import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import type { Color, Variant } from './types';

export interface BadgeProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  pill?: boolean;
  positioned?: boolean;
  text?: Color;
}

const propTypes = {
  /** @default 'badge' */
  bsPrefix: PropTypes.string,

  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  bg: PropTypes.string,

  /**
   * Add the `pill` modifier to make badges more rounded with
   * some additional horizontal padding
   */
  pill: PropTypes.bool,

  /**
   * Add the `positioned`
   * with the `pill` to modify a badge and position it in the corner of a link or button
   * without the `pill` is an empty circle without a count for a more generic indicator
   */
  positioned: PropTypes.bool,

  /**
   * Sets badge text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  text: PropTypes.string,

  /** @default span */
  as: PropTypes.elementType,
};

const Badge: BsPrefixRefForwardingComponent<'span', BadgeProps> =
  React.forwardRef<HTMLElement, BadgeProps>(
    (
      {
        bsPrefix,
        bg = 'primary',
        pill = false,
        positioned = false,
        text,
        className,
        as: Component = 'span',
        ...props
      },
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
            positioned &&
              pill &&
              `position-absolute top-0 start-100 translate-middle`,
            positioned && !pill && `position-absolute top-0 start-100 translate-middle border border-light rounded-circle`,
            text && `text-${text}`,
            bg && `bg-${bg}`,
          )}
        />
      );
    },
  ) as typeof Badge;

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;

export default Badge;
