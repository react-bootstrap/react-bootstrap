import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormTextProps {
  innerRef?: React.LegacyRef<this>;
  muted?: boolean;
}

declare class FormText<
  As extends React.ElementType = 'small'
> extends BsPrefixComponent<As, FormTextProps> {}

export default FormText;
