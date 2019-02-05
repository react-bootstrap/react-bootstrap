import * as React from 'react';

import Feedback from './Feedback';

import { BsPrefixComponent } from './helpers';

export interface FormControlProps {
  innerRef?: React.LegacyRef<this>;
  size?: 'sm' | 'lg';
  plaintext?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: React.FormEventHandler<this>;
  type?: string;
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

declare class Form<
  As extends React.ReactType = 'input'
> extends BsPrefixComponent<As, FormControlProps> {
  static Feedback: typeof Feedback;
}

export default Form;
