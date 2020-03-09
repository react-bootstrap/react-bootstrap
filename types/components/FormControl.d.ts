import * as React from 'react';
import Feedback from './Feedback';
import { BsPrefixComponent } from './helpers';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export interface FormControlProps {
  innerRef?: React.LegacyRef<FormControlElement>;
  size?: 'sm' | 'lg';
  plaintext?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string | string[] | number;
  onChange?: React.FormEventHandler<FormControlElement>;
  custom?: boolean;
  type?: string;
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

declare class FormControl<
  As extends React.ElementType = 'input'
> extends BsPrefixComponent<As, FormControlProps> {
  static Feedback: typeof Feedback;
}

export default FormControl;
