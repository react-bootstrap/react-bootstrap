import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface FormCheckInputProps {
  id?: string;
  type?: 'checkbox' | 'radio';
  isStatic?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  innerRef?: React.LegacyRef<this>;
}

declare class FormCheckInput extends BsPrefixComponent<
  'input',
  FormCheckInputProps
> {}

export default FormCheckInput;
