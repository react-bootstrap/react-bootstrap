import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormFileInputProps {
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  lang?: string;
}

declare class FormFileInput<
  As extends React.ElementType = 'input'
> extends BsPrefixComponent<As, FormFileInputProps> {}

export default FormFileInput;
