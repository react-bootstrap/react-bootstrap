import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

// TODO: `aria-label` should be `closeLabel`.

const propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  'aria-label': PropTypes.string,

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
  'aria-label': 'Close',
  closeButton: false,
};

const contextTypes = {
  $bs_modal: PropTypes.shape({
    onHide: PropTypes.func,
  }),
};

class ModalHeader extends React.Component {
  render() {
    const {
      'aria-label': label,
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
      <div
        {...elementProps}
        className={classNames(className, classes)}
      >
        {closeButton &&
          <button
            type="button"
            className="close"
            aria-label={label}
            onClick={createChainedFunction(modal && modal.onHide, onHide)}
          >
            <span aria-hidden="true">
              &times;
            </span>
          </button>
        }

        {children}
      </div>
    );
  }
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;
ModalHeader.contextTypes = contextTypes;

export default bsClass('modal-header', ModalHeader);
