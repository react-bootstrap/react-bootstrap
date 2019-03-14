import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

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
};

const defaultProps = {
  pill: false,
};

const Badge = React.forwardRef(
  ({ bsPrefix, variant, pill, className, ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'badge');
    return (
      <span
        ref={ref}
        {...props}
        className={classNames(
          className,
          prefix,
          pill && `${prefix}-pill`,
          variant && `${prefix}-${variant}`,
        )}
      />
    );
  },
);

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
