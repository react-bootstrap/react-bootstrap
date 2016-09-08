import classNames from 'classnames';
import React from 'react';

import Button from './Button';
import { bsClass, bsSizes, getClassSet, splitBsProps }
  from './utils/bootstrapUtils';

class ButtonToolbar extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <div
        {...elementProps}
        role="toolbar"
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('btn-toolbar',
  bsSizes(Button.SIZES, ButtonToolbar)
);
