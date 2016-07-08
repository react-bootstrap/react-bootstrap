import classNames from 'classnames';
import React from 'react';

import Button from './Button';
import { bsClass, bsSizes, getClassSet, omitBsProps }
  from './utils/bootstrapUtils';

class ButtonToolbar extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const classes = getClassSet(props);

    return (
      <div
        {...omitBsProps(props)}
        role="toolbar"
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('btn-toolbar',
  bsSizes(Button.SIZES, ButtonToolbar)
);
