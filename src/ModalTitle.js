import classNames from 'classnames';
import React from 'react';

import { bsClass, prefix } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

class ModalTitle extends React.Component {
  render() {
    const domProps = ensureDomProps(this.props, 'h4');
    return (
      <h4
        {...domProps}
        className={classNames(this.props.className, prefix(this.props, 'title'))}
      >
        { this.props.children }
      </h4>
    );
  }
}


export default bsClass('modal', ModalTitle);
