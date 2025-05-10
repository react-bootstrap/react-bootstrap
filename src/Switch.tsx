import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import FormCheck, { FormCheckProps } from './FormCheck';

type SwitchProps = Omit<FormCheckProps, 'type'>;

const Switch: DynamicRefForwardingComponent<typeof FormCheck, SwitchProps> =
  React.forwardRef<typeof FormCheck, SwitchProps>((props, ref) => (
    <FormCheck {...props} ref={ref} type="switch" />
  ));

Switch.displayName = 'Switch';

export default Object.assign(Switch, {
  Input: FormCheck.Input,
  Label: FormCheck.Label,
});
