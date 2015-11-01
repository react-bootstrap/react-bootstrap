import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';

class ModalBody extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        className={classNames(this.props.className, tbsUtils.prefix(this.props, 'body'))}>
        {this.props.children}
      </div>
    );
  }
}

ModalBody.propTypes = {
  /**
   * A css class applied to the Component
   */
  bsClass: React.PropTypes.string
};

ModalBody.defaultProps = {
  bsClass: 'modal'
};


export default ModalBody;
