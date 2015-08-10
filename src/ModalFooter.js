import React from 'react';
import classNames from 'classnames';

class ModalFooter extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        className={classNames(this.props.className, this.props.modalClassName)}>
        {this.props.children}
      </div>
    );
  }
}

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: React.PropTypes.string
};

ModalFooter.defaultProps = {
  modalClassName: 'modal-footer'
};

export default ModalFooter;
