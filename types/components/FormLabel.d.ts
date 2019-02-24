import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface FormLabelProps {
  htmlFor?: string;
  innerRef?: React.LegacyRef<this>;
  srOnly?: boolean;
}

declare class FormLabel<
  As extends React.ReactType = 'label'
> extends BsPrefixComponent<As, FormLabelProps> {}

export default FormLabel;
