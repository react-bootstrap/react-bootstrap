import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';

class Badge extends React.Component {
  static propTypes = {
    /** @default 'badge' */
    bsPrefix: PropTypes.string.isRequired,

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

  static defaultProps = {
    pill: false,
  };

  render() {
    const { bsPrefix, variant, pill, className, ...props } = this.props;

    return (
      <span
        {...props}
        className={classNames(
          className,
          bsPrefix,
          pill && `${bsPrefix}-pill`,
          variant && `${bsPrefix}-${variant}`,
        )}
      />
    );
  }
}

export default createBootstrapComponent(Badge, 'badge');
