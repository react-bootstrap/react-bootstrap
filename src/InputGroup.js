import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import { bsClass, bsSizes, getClassSet } from './utils/bootstrapUtils';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';

import ensureDomProps from './utils/ensureDomProps';

class InputGroup extends React.Component {
  render() {
    const { className, ...props } = this.props;
    delete props.bsClass;
    delete props.bsSize;

    const classes = getClassSet(this.props);
    const domProps = ensureDomProps(props, 'span');
    return (
      <span {...domProps} className={classNames(className, classes)} />
    );
  }
}

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

export default bsClass('input-group',
  bsSizes([Sizes.LARGE, Sizes.SMALL], InputGroup)
);
