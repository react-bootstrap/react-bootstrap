
import React from 'react';
import classnames from 'classnames';

class ModalHeader extends React.Component {

  render() {
    return (
      <div
        {...this.props}
        className={classnames(this.props.className, this.props.modalClassName)}
      >
        { this.props.closeButton &&
          <button
            className='close'
            aria-label={this.props['aria-label'] || 'Close'} //eslint-disable-line react/prop-types
            onClick={this.props.onHide}
            style={{ marginTop: -2 }}
          >
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

//used in liue of parent contexts right now to auto wire the close button
ModalHeader.__isModalHeader = true;

ModalHeader.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: React.PropTypes.string,
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

ModalHeader.defaultProps = {
  modalClassName: 'modal-header',
  closeButton: false
};


export default ModalHeader;
