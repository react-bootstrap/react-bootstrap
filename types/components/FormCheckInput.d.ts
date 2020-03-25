import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormCheckInputProps {
  id?: string;
  type?: 'checkbox' | 'radio';
  isStatic?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
}

declare interface FormCheckInput
  extends BsPrefixRefForwardingComponent<'input', FormCheckInputProps> {}

declare const FormCheckInput: FormCheckInput;

export default FormCheckInput;
