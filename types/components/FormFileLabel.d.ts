import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormFileLabelProps {
  htmlFor?: string;
}

declare class FormFileLabel extends BsPrefixComponent<
  'label',
  FormFileLabelProps
> {}

export default FormFileLabel;
