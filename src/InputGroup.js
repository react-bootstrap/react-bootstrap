import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import bootstrapUtils, { bsClass, bsSizes } from './utils/bootstrapUtils';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

class InputGroup extends React.Component {
  render() {
    const { className, ...props } = this.props;
    delete props.bsClass;
    delete props.bsSize;

    const classes = bootstrapUtils.getClassSet(this.props);

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
