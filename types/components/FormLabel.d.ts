import * as React from 'react';

import { ColProps } from './Col';

import { BsPrefixComponent } from './helpers';

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

export type FormLabelProps = FormLabelWithColProps | FormLabelOwnProps;

declare class FormLabel extends BsPrefixComponent<'label', FormLabelProps> {}

export default FormLabel;
