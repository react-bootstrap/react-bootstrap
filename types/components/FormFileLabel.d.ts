import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormFileLabelProps {
  htmlFor?: string;
}

declare interface FormFileLabel
  extends BsPrefixRefForwardingComponent<'label', FormFileLabelProps> {}

declare const FormFileLabel: FormFileLabel;

export default FormFileLabel;
