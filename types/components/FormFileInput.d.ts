import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormFileInputProps {
  id?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  lang?: string;
}

declare interface FormFileInput
  extends BsPrefixRefForwardingComponent<'input', FormFileInputProps> {}

declare const FormFileInput: FormFileInput;

export default FormFileInput;
