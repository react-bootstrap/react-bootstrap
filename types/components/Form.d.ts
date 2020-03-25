import * as React from 'react';

import FormCheck from './FormCheck';
import FormFile from './FormFile';
import FormControl from './FormControl';
import FormGroup from './FormGroup';
import FormLabel from './FormLabel';
import FormText from './FormText';

import { BsPrefixComponent, BsPrefixRefForwardingComponent } from './helpers';

export class FormRow<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export interface FormProps {
  inline?: boolean;
  validated?: boolean;
}

declare interface Form
  extends BsPrefixRefForwardingComponent<'form', FormProps> {
  Row: typeof FormRow;
  Group: typeof FormGroup;
  Control: typeof FormControl;
  Check: typeof FormCheck;
  File: typeof FormFile;
  Label: typeof FormLabel;
  Text: typeof FormText;
}

declare const Form: Form;
export default Form;
