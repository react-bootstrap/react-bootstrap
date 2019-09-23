import * as React from 'react';

import FormCheckInput from './FormCheckInput';
import FormCheckLabel from './FormCheckLabel';

import { BsPrefixComponent } from './helpers';

export interface FormCheckProps {
  bsCustomPrefix?: string;
  innerRef?: React.LegacyRef<this>;
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

declare class FormCheck extends BsPrefixComponent<'input', FormCheckProps> {
  static Input: typeof FormCheckInput;
  static Label: typeof FormCheckLabel;
}

export default FormCheck;
