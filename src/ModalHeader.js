import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

// TODO: `aria-label` should be `closeLabel`.

const propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  'aria-label': React.PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: React.PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: React.PropTypes.func,
};

const defaultProps = {
  'aria-label': 'Close',
  closeButton: false,
};

const contextTypes = {
  $bs_onModalHide: React.PropTypes.func,
};

class ModalHeader extends React.Component {
  render() {
    const {
      'aria-label': label, closeButton, onHide, className, children, ...props,
    } = this.props;
    const onModalHide = this.context.$bs_onModalHide;

    const classes = getClassSet(props);

    return (
      <div
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      >
        {closeButton &&
          <button
            type="button"
            className="close"
            aria-label={label}
            onClick={createChainedFunction(onModalHide, onHide)}
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
