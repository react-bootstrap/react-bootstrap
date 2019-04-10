import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface AccordionToggleProps {
  eventKey: string;
  onClick: (arg0?: React.SyntheticEvent) => any;
}

declare class AccordionToggle<
  As extends React.ReactType = 'button'
> extends BsPrefixComponent<As, AccordionToggleProps> {}

export default AccordionToggle;
