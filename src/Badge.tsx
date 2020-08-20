import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Color, Variant } from './types';

export interface BadgeProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  pill?: boolean;
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
   * Sets badge text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  text: PropTypes.string,

  /** @default span */
  as: PropTypes.elementType,
};

const defaultProps = {
  bg: 'primary',
  pill: false,
};

const Badge: BsPrefixRefForwardingComponent<'span', BadgeProps> =
  React.forwardRef<HTMLElement, BadgeProps>(
    (
      { bsPrefix, bg, pill, text, className, as: Component = 'span', ...props },
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
