import * as React from 'react';

import FormGroup from './FormGroup';
import FormControl from './FormControl';
import FormCheck from './FormCheck';
import FormLabel from './FormLabel';
import FormText from './FormText';

import { BsPrefixComponent } from './helpers';

declare class FormRow<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export interface FormProps {
  innerRef?: React.LegacyRef<this>;
  inline?: boolean;
  validated?: boolean;
}

declare class Form<
  As extends React.ReactType = 'form'
> extends BsPrefixComponent<As, FormProps> {
  static Row: typeof FormRow;
  static Group: typeof FormGroup;
  static Control: typeof FormControl;
  static Check: typeof FormCheck;
  static Label: typeof FormLabel;
  static Text: typeof FormText;
}

export default Form;
