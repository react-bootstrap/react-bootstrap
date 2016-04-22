import classNames from 'classnames';
import React from 'react';

import { bsClass, prefix } from './utils/bootstrapUtils';

class ModalBody extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        className={classNames(this.props.className, prefix(this.props, 'body'))}
      >
        {this.props.children}
      </div>
    );
  }
}


export default bsClass('modal', ModalBody);
