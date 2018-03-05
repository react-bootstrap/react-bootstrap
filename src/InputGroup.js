import classNames from 'classnames';
import React from 'react';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import InputGroupText from './InputGroupText';
import InputGroupPrepend from './InputGroupPrepend';
import InputGroupAppend from './InputGroupAppend';
import {
  bsClass,
  bsSizes,
  getClassSet,
  splitBsProps
} from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

class InputGroup extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return <div {...elementProps} className={classNames(className, classes)} />;
  }
}

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;
InputGroup.Text = InputGroupText;

InputGroup.Checkbox = props => (
  <InputGroupText>
    <input type="checkbox" {...props} />
  </InputGroupText>
);

InputGroup.Radio = props => (
  <InputGroupText>
    <input type="radio" {...props} />
  </InputGroupText>
);

export default bsClass(
  'input-group',
  bsSizes([Size.LARGE, Size.SMALL], InputGroup)
);
