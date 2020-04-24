import { FormCheckProps } from './FormCheck';
import FormCheck from './FormCheck';
import { BsPrefixRefForwardingComponent } from './helpers';

type SwitchProps = Omit<FormCheckProps, 'type'>;

declare interface Switch
  extends BsPrefixRefForwardingComponent<FormCheck, SwitchProps> {}

declare const Switch: Switch;

export default Switch;
