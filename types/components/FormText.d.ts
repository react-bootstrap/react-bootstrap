import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface FormTextProps {
  innerRef?: React.LegacyRef<this>;
  muted?: boolean;
}

declare class FormText<
  As extends React.ReactType = 'small'
> extends BsPrefixComponent<As, FormTextProps> {}

export default FormText;
