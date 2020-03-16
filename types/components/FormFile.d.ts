import * as React from 'react';
import FormFileInput from './FormFileInput';
import FormFileLabel from './FormFileLabel';
import { BsPrefixComponent } from './helpers';

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

declare class FormFile<
  As extends React.ElementType = 'input'
> extends BsPrefixComponent<As, FormFileProps> {
  static Input: typeof FormFileInput;
  static Label: typeof FormFileLabel;
}

export default FormFile;
