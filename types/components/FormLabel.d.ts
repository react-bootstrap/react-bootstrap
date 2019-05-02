import * as React from 'react';

import { BsPrefixComponent } from './helpers';
import { ColProps } from './Col';

interface FormLabelBaseProps {
  htmlFor?: string;
  innerRef?: React.LegacyRef<this>;
  srOnly?: boolean;
}

export interface FormLabelOwnProps extends FormLabelBaseProps {
  column?: false;
}

export interface FormLabelWithColProps extends FormLabelBaseProps, ColProps {
  column: true;
}

export type FormLabelProps = FormLabelWithColProps | FormLabelOwnProps

declare class FormLabel extends BsPrefixComponent<'label', FormLabelProps> {}

export default FormLabel;
