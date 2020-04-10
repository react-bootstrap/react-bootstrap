import * as React from 'react';
import Feedback from './Feedback';
import { BsPrefixRefForwardingComponent } from './helpers';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export interface FormControlProps {
  size?: 'sm' | 'lg';
  plaintext?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string | string[] | number;
  onChange?: React.ChangeEventHandler<FormControlElement>;
  custom?: boolean;
  type?: string;
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

declare interface FormControl
  extends BsPrefixRefForwardingComponent<'input', FormControlProps> {
  Feedback: typeof Feedback;
}

declare const FormControl: FormControl;

export default FormControl;
