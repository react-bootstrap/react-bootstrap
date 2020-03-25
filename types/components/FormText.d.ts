import { BsPrefixRefForwardingComponent } from './helpers';

export interface FormTextProps {
  muted?: boolean;
}

declare interface FormText
  extends BsPrefixRefForwardingComponent<'small', FormTextProps> {}

declare const FormText: FormText;

export default FormText;
