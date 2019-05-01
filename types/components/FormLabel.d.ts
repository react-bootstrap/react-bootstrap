import * as React from 'react';

import { BsPrefixComponent } from './helpers';
import { ColProps } from './Col';

export interface FormLabelProps extends ColProps {
  htmlFor?: string;
  column?: boolean;
  innerRef?: React.LegacyRef<this>;
  srOnly?: boolean;
}

declare class FormLabel extends BsPrefixComponent<'label', FormLabelProps> {}

export default FormLabel;
