import React from 'react';
import classNames from 'classnames';
import tbsUtils, { bsClass } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';

class ModalHeader extends React.Component {

  render() {
    let { 'aria-label': label, ...props } = this.props;
    let onHide = createChainedFunction(this.context.$bs_onModalHide, this.props.onHide);

    return (
      <div
        {...props}
        className={classNames(this.props.className, tbsUtils.prefix(this.props, 'header'))}
      >
        { this.props.closeButton &&
          <button
            type="button"
            className="close"
            aria-label={label}
            onClick={onHide}>
            <span aria-hidden="true">
              &times;
            </span>
          </button>
        }
        { this.props.children }
      </div>
    );
  }
}

ModalHeader.propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close button.
   * It is used for Assistive Technology when the label text is not readable.
   */
  'aria-label': React.PropTypes.string,

  bsClass: React.PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: React.PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically
   * be propagated up to the parent Modal `onHide`.
   */
  onHide: React.PropTypes.func
};

ModalHeader.contextTypes = {
  '$bs_onModalHide': React.PropTypes.func
};

ModalHeader.defaultProps = {
  'aria-label': 'Close',
  closeButton: false
};


export default bsClass('modal', ModalHeader);
