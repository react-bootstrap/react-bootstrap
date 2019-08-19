import React from 'react';
import FormCheck from './FormCheck';

const Switch = React.forwardRef((props, ref) => (
  <FormCheck {...props} ref={ref} type="switch" />
));

Switch.displayName = 'Switch';

Switch.Input = FormCheck.Input;
Switch.Label = FormCheck.Label;

export default Switch;
