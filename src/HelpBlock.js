import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

class HelpBlock extends React.Component {
  render() {
    const { className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <span
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('help-block', HelpBlock);
