import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

class ModalDialog extends React.Component {
  static propTypes = {
    bsPrefix: PropTypes.string,

    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: PropTypes.string,

    /**
     * Specifies a large or small modal.
     *
     * @type ('sm'|'lg')
     */
    size: PropTypes.string,

    /**
     * Specify whether the Component should be vertically centered
     */
    centered: PropTypes.bool
  };

  render() {
    const {
      bsPrefix,
      className,
      dialogClassName,
      centered,
      size,
      children,
      ...props
    } = this.props;

    const dialogClasses = classNames(
      `${bsPrefix}-dialog`,
      dialogClassName,
      centered && `${bsPrefix}-dialog-centered`,
      size && `${bsPrefix}-${size}`
    );

    return (
      <div tabIndex="-1" {...props} className={classNames(className, bsPrefix)}>
        <div className={dialogClasses}>
          <div className={classNames('modal-content')}>{children}</div>
        </div>
      </div>
    );
  }
}

export default createBootstrapComponent(ModalDialog, 'modal');
