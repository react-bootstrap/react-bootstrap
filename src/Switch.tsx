import React from 'react';
import FormCheck, { FormCheckProps } from './FormCheck';
import { BsPrefixRefForwardingComponent } from './helpers';

type SwitchProps = Omit<FormCheckProps, 'type'>;

type Switch = BsPrefixRefForwardingComponent<FormCheck, SwitchProps> & {
  Input: typeof FormCheck.Input;
  Label: typeof FormCheck.Label;
};

// declare interface Switch
//   extends BsPrefixRefForwardingComponent<FormCheck, SwitchProps> {}
//
// declare const Switch: Switch;

const Switch: Switch = (React.forwardRef<FormCheck, SwitchProps>(
  (props, ref) => <FormCheck {...props} ref={ref} type="switch" />,
) as unknown) as Switch;

Switch.displayName = 'Switch';

Switch.Input = FormCheck.Input;
Switch.Label = FormCheck.Label;

export default Switch;
