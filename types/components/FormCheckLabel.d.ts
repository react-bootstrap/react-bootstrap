import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormCheckLabelProps {
  htmlFor?: string;
}

declare interface FormCheckLabel
  extends BsPrefixRefForwardingComponent<'label', FormCheckLabelProps> {}

declare const FormCheckLabel: FormCheckLabel;

export default FormCheckLabel;
