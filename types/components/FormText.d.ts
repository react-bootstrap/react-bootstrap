import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormTextProps {
  innerRef?: React.LegacyRef<this>;
  muted?: boolean;
}

declare class FormText extends BsPrefixComponent<'small', FormTextProps> {}

export default FormText;
