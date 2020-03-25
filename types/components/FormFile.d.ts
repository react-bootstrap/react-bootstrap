import * as React from 'react';
import FormFileInput from './FormFileInput';
import FormFileLabel from './FormFileLabel';
import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormFileProps {
  bsCustomPrefix?: string;
  id?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  custom?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: React.ReactNode;
  lang?: string;
}

declare interface FormFile
  extends BsPrefixRefForwardingComponent<'input', FormFileProps> {
  Input: typeof FormFileInput;
  Label: typeof FormFileLabel;
}

declare const FormFile: FormFile;

export default FormFile;
