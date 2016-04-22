import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import { bsClass, bsSizes, getClassSet } from './utils/bootstrapUtils';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

class InputGroup extends React.Component {
  render() {
    const { className, ...props } = this.props;
    delete props.bsClass;
    delete props.bsSize;

    const classes = getClassSet(this.props);

    return (
      <span {...props} className={classNames(className, classes)} />
    );
  }
}

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

export default bsClass('input-group',
  bsSizes([Sizes.LARGE, Sizes.SMALL], InputGroup)
);
