import * as React from 'react';

import { BsPrefixRefForwardingComponent } from './helpers';

export interface AccordionToggleProps {
  eventKey: string;
  onClick?: (event?: React.SyntheticEvent) => void;
}

export function useAccordionToggle(
  eventKey: string,
  onClick: (event?: React.SyntheticEvent) => void,
): (event?: React.SyntheticEvent) => void;

declare interface AccordionToggle
  extends BsPrefixRefForwardingComponent<'div', AccordionToggleProps> {}
declare const AccordionToggle: AccordionToggle;

export default AccordionToggle;
