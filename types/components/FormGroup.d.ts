import * as React from 'react';
import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormGroupProps {
  controlId?: string;
}

declare interface FormGroup
  extends BsPrefixRefForwardingComponent<'div', FormGroupProps> {}

declare const FormGroup: FormGroup;
export default FormGroup;
