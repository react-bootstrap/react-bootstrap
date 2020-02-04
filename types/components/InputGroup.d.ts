import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export class InputGroupAppend<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class InputGroupPrepend<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class InputGroupText<
  As extends React.ElementType = 'span'
> extends BsPrefixComponent<As> {}

export class InputGroupCheckbox extends BsPrefixComponent<'input'> {}

export class InputGroupRadio extends BsPrefixComponent<'input'> {}

export interface InputGroupProps {
  size?: 'sm' | 'lg';
}

declare class InputGroup<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, InputGroupProps> {
  static Append: typeof InputGroupAppend;
  static Prepend: typeof InputGroupPrepend;
  static Text: typeof InputGroupText;
  static Checkbox: typeof InputGroupCheckbox;
  static Radio: typeof InputGroupRadio;
}

export default InputGroup;
