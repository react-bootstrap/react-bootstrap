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

declare interface FormProps {
  innerRef?: React.LegacyRef<this>;
  inline?: boolean;
  validated?: boolean;
}

declare class Form<
  As extends React.ReactType = 'form'
> extends BsPrefixComponent<As, FormProps> {
  public static Row: typeof FormRow;
  public static Group: typeof FormGroup;
  public static Control: typeof FormControl;
  public static Check: typeof FormCheck;
  public static Label: typeof FormLabel;
  public static Text: typeof FormText;
}

export default Form;
