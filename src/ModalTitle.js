import classNames from 'classnames';
import React from 'react';

import { bsClass, prefix } from './utils/bootstrapUtils';

class ModalTitle extends React.Component {
  render() {
    return (
      <h4
        {...this.props}
        className={classNames(this.props.className, prefix(this.props, 'title'))}
      >
        { this.props.children }
      </h4>
    );
  }
}


export default bsClass('modal', ModalTitle);
