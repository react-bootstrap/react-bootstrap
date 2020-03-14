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

declare class FormLabel<
  As extends React.ElementType = 'label'
> extends BsPrefixComponent<As, FormLabelProps> {}

export default FormLabel;
