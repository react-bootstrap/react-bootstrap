import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import CloseButton from './CloseButton';

// TODO: `aria-label` should be `closeLabel`.

const propTypes = {
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
  onHide: PropTypes.func
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};

const contextTypes = {
  $bs_modal: PropTypes.shape({
    onHide: PropTypes.func
  })
};

class ModalHeader extends React.Component {
  render() {
    const {
      closeLabel,
      closeButton,
      onHide,
      className,
      children,
      ...props
    } = this.props;

    const modal = this.context.$bs_modal;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <div {...elementProps} className={classNames(className, classes)}>
        {closeButton && (
          <CloseButton
            label={closeLabel}
            onClick={createChainedFunction(modal && modal.onHide, onHide)}
          />
        )}

        {children}
      </div>
    );
  }
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;
ModalHeader.contextTypes = contextTypes;

export default bsClass('modal-header', ModalHeader);
