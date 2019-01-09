import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface FormCheckLabelProps {
  htmlFor?: string;
  innerRef?: React.LegacyRef<this>;
}

declare class FormCheckLabel extends BsPrefixComponent<
  'label',
  FormCheckLabelProps
> {}

export default FormCheckLabel;
