import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

class ModalTitle extends React.Component {
  render() {
    const { className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <h4
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('modal-title', ModalTitle);
