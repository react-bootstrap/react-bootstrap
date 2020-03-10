import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormFileInputProps {
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  innerRef?: React.LegacyRef<this>;
}

declare class FormFileInput<
  As extends React.ElementType = 'input'
> extends BsPrefixComponent<As, FormFileInputProps> {}

export default FormFileInput;
