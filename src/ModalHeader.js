import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';
import createChainedFunction from './utils/createChainedFunction';
import CloseButton from './CloseButton';
import ModalContext from './ModalContext';

const propTypes = {
  bsPrefix: PropTypes.string,

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: PropTypes.func,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false,
};

class ModalHeader extends React.Component {
  render() {
    const {
      bsPrefix,
      closeLabel,
      closeButton,
      onHide,
      className,
      children,
      ...props
    } = this.props;

    return (
      <ModalContext.Consumer>
        {context => (
          <div {...props} className={classNames(className, bsPrefix)}>
            {children}

            {closeButton && (
              <CloseButton
                label={closeLabel}
                onClick={createChainedFunction(
                  context && context.onHide,
                  onHide,
                )}
              />
            )}
          </div>
        )}
      </ModalContext.Consumer>
    );
  }
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default createBootstrapComponent(ModalHeader, 'modal-header');
