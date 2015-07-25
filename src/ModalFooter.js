import React from 'react';
import classnames from 'classnames';


class ModalFooter extends React.Component {

  render() {
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {ref: child.ref});
    });
    return (
      <div {...this.props} className={classnames(this.props.className, this.props.modalClassName)}>
        {children}
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
