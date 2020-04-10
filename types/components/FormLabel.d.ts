import * as React from 'react';

import { ColProps } from './Col';

import { BsPrefixRefForwardingComponent } from './helpers';

interface FormLabelBaseProps {
  htmlFor?: string;
  srOnly?: boolean;
}

export interface FormLabelOwnProps extends FormLabelBaseProps {
  column?: false;
}

export interface FormLabelWithColProps extends FormLabelBaseProps, ColProps {
  column: true | 'sm' | 'lg';
}

export type FormLabelProps = FormLabelWithColProps | FormLabelOwnProps;

declare interface FormLabel
  extends BsPrefixRefForwardingComponent<'label', FormLabelProps> {}

declare const FormLabel: FormLabel;

export default FormLabel;
