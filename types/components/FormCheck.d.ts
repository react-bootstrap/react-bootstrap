import * as React from 'react';
import FormCheckInput from './FormCheckInput';
import FormCheckLabel from './FormCheckLabel';
import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormCheckProps {
  bsCustomPrefix?: string;
  id?: string;
  inline?: boolean;
  disabled?: boolean;
  title?: string;
  label?: React.ReactNode;
  custom?: boolean;
  type?: 'checkbox' | 'radio' | 'switch';
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: React.ReactNode;
}

declare interface FormCheck
  extends BsPrefixRefForwardingComponent<'input', FormCheckProps> {
  Input: typeof FormCheckInput;
  Label: typeof FormCheckLabel;
}

declare const FormCheck: FormCheck;

export default FormCheck;
