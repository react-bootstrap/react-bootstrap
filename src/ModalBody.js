import React from 'react';
import classNames from 'classnames';
import tbsUtils, { bsClass } from './utils/bootstrapUtils';

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


export default bsClass('modal', ModalBody);
