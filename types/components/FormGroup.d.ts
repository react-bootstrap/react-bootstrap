import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface FormGroupProps {
  innerRef?: React.LegacyRef<this>;
  controlId?: string;
}

declare class Form extends BsPrefixComponent<'div', FormGroupProps> {}

export default Form;
