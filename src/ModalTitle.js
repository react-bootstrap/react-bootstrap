import React from 'react';
import classnames from 'classnames';

class ModalTitle extends React.Component {

  render() {
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {ref: child.ref});
    });
    return (
      <h4 {...this.props} className={classnames(this.props.className, this.props.modalClassName)}>
        { children }
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
