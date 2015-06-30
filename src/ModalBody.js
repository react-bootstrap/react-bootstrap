import React from 'react';
import classnames from 'classnames';

class ModalBody extends React.Component {
  render() {
    return (
      <div {...this.props} className={classnames(this.props.className, this.props.modalClassName)}>
        {this.props.children}
      </div>
    );
  }
}

ModalBody.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: React.PropTypes.string
};

ModalBody.defaultProps = {
  modalClassName: 'modal-body'
};


export default ModalBody;
