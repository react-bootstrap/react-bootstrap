import React from 'react';
import FormCheck, { FormCheckProps } from './FormCheck';
import { BsPrefixRefForwardingComponent } from './helpers';

type SwitchProps = Omit<FormCheckProps, 'type'>;

declare interface Switch
  extends BsPrefixRefForwardingComponent<FormCheck, SwitchProps> {}

declare const Switch: Switch;

const Switch = React.forwardRef((props, ref) => (
  <FormCheck {...props} ref={ref} type="switch" />
));

Switch.displayName = 'Switch';

Switch.Input = FormCheck.Input;
Switch.Label = FormCheck.Label;

export default Switch;
