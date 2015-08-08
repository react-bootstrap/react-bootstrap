import React from 'react';
import classNames from 'classnames';

class ModalTitle extends React.Component {
  render() {
    return (
      <h4
        {...this.props}
        className={classNames(this.props.className, this.props.modalClassName)}>
        { this.props.children }
      </h4>
    );
  }
}

ModalTitle.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: React.PropTypes.string
};

ModalTitle.defaultProps = {
  modalClassName: 'modal-title'
};

export default ModalTitle;
