import classNames from 'classnames';
import React from 'react';

import { bsClass, prefix } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

class ModalBody extends React.Component {
  render() {
    const domProps = ensureDomProps(this.props, 'div');
    return (
      <div
        {...domProps}
        className={classNames(this.props.className, prefix(this.props, 'body'))}
      >
        {this.props.children}
      </div>
    );
  }
}


export default bsClass('modal', ModalBody);
