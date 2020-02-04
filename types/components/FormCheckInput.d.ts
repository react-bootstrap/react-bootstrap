import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormCheckInputProps {
  id?: string;
  type?: 'checkbox' | 'radio';
  isStatic?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  innerRef?: React.LegacyRef<this>;
}

declare class FormCheckInput<
  As extends React.ElementType = 'input'
> extends BsPrefixComponent<As, FormCheckInputProps> {}

export default FormCheckInput;
