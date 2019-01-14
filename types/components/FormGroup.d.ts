import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface FormGroupProps {
  innerRef?: React.LegacyRef<this>;
  controlId?: string;
}

declare class Form<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, FormGroupProps> {}

export default Form;
