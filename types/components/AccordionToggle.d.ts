import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface AccordionToggleProps {
  eventKey: string;
  onClick?: (event?: React.SyntheticEvent) => void;
}

declare class AccordionToggle extends BsPrefixComponent<'button', AccordionToggleProps> {}

export default AccordionToggle;
