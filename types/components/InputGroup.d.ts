import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class InputGroupAppend<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class InputGroupPrepend<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class InputGroupText<
  As extends React.ReactType = 'span'
> extends BsPrefixComponent<As> {}

declare class InputGroupCheckbox extends BsPrefixComponent<'input'> {}
declare class InputGroupRadio extends BsPrefixComponent<'input'> {}

interface InputGroupProps {
  size?: 'sm' | 'lg';
}

declare class InputGroup<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, InputGroupProps> {
  static Append: typeof InputGroupAppend;
  static Prepend: typeof InputGroupPrepend;
  static Text: typeof InputGroupText;
  static Checkbox: typeof InputGroupCheckbox;
  static Radio: typeof InputGroupRadio;
}

export default InputGroup;
