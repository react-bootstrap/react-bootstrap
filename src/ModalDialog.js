import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

class ModalDialog extends React.Component {
  static propTypes = {
    bsPrefix: PropTypes.string,

    /**
     * Specifies a large or small modal.
     *
     * @type ('sm'|'lg')
     */
    size: PropTypes.string,

    /**
     * Specify whether the Component should be vertically centered
     */
    centered: PropTypes.bool,
  };

  render() {
    const {
      bsPrefix,
      className,
      centered,
      size,
      children,
      ...props
    } = this.props;

    const bsClass = `${bsPrefix}-dialog`;
    return (
      <div
        {...props}
        className={classNames(
          bsClass,
          className,
          size && `${bsPrefix}-${size}`,
          centered && `${bsClass}-centered`,
        )}
      >
        <div className={classNames(`${bsPrefix}-content`)}>{children}</div>
      </div>
    );
  }
}

export default createBootstrapComponent(ModalDialog, 'modal');
